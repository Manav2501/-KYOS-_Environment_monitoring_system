 
import time, sys
import RPi.GPIO as GPIO
 
GPIO.setmode(GPIO.BOARD)
GPIO.setup(11, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
 
def action(pin):
    print('Sensor detected action!')
    return
 
GPIO.add_event_detect(11, GPIO.RISING)
GPIO.add_event_callback(11, action)
 
try:
    while True:
        print('alive')
        time.sleep(0.5)
except KeyboardInterrupt:
    GPIO.cleanup()
    sys.exit()