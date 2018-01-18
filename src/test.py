#!/usr/bin/env python3

import time
from networktables import NetworkTables

# To see messages from networktables, you must setup logging
import logging
logging.basicConfig(level=logging.DEBUG)

NetworkTables.initialize()
sd = NetworkTables.getTable("SmartDashboard")

def valueChanged(table, key, value, isNew):
    print("valueChanged: key: '%s'; value: %s; isNew: %s" % (key, value, isNew))
sd.addEntryListener(valueChanged)


i = 0
while True:
    i += 1
    sd.putNumber('robotTime', i)
    
    print('robotTime:', sd.getNumber('robotTime', 'N/A'))
    time.sleep(1)
