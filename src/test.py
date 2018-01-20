#!/usr/bin/env python3

import time, random
from networktables import NetworkTables

# To see messages from networktables, you must setup logging
import logging
logging.basicConfig(level=logging.DEBUG)

NetworkTables.initialize()
sd = NetworkTables.getTable("SmartDashboard")
fmsinfo = NetworkTables.getTable("FMSInfo")

def valueChanged(table, key, value, isNew):
    print("valueChanged: key: '%s'; value: %s; isNew: %s" % (key, value, isNew))
sd.addEntryListener(valueChanged)
sd.putString('robotPhase', 'Teleop')
def randbool():
    return random.getrandbits(1) == 1

station = 1
red = False
i = 0
while True:
    i += 1
    sd.putNumber('robotTime', i)
    sd.putNumber('voltage', random.randint(0,100))
    sd.putNumber('current', random.uniform(0,100))

    if station == 3:
        station = 1
        red = not red
        fmsinfo.putBoolean('IsRedAlliance',red)
    else:
        station = station + 1

    fmsinfo.putNumber('StationNumber',station)
    fmsinfo.putString('GameSpecificMessage','l' if randbool() else 'r')

    for key in fmsinfo.getKeys():
        print(key, fmsinfo.getValue(key, 'N/A'))
    print('robotTime:', sd.getNumber('robotTime', 'N/A'))

    time.sleep(1)
