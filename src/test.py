#!/usr/bin/env python3

import time, random
from networktables import NetworkTables

# To see messages from networktables, you must setup logging
import logging
logging.basicConfig(level=logging.DEBUG)

NetworkTables.initialize()
sd = NetworkTables.getTable("SmartDashboard")

def valueChanged(table, key, value, isNew):
    print("valueChanged: key: '%s'; value: %s; isNew: %s" % (key, value, isNew))
sd.addEntryListener(valueChanged)
sd.putString('robotPhase', 'Teleop')

i = 0
while True:
    i += 1
    sd.putNumber('robotTime', i)
    sd.putNumber('voltage', random.randint(0,100))
    sd.putNumber('current', random.uniform(0,100))

    
    print('robotTime:', sd.getNumber('robotTime', 'N/A'))
    time.sleep(1)
