#!/usr/bin/python

# See README.txt for usage examples

import getopt, sys
import os, subprocess

TESTFILE = "queuetemp/woo hoo.txt"


def main():
    try:
        #opts, args = getopt.getopt(sys.argv[1:], "ho:v", ["help", "output="])
        opts, args = getopt.getopt(sys.argv[1:], "ap", ["andrew=", "path="])
    except getopt.GetoptError as err:
        # print help information and exit:
        print str(err) # will print something like "option -a not recognized"
        sys.exit(2)

    filepath = "-1"
    andrewId = "-1"


    # Parse the options
    for o, a in opts:
        print "option[", o, ']','[',a,']'
        if o in ('a', "--andrew"):
            andrewId = a
        elif o in ('p', "--path"):
            filepath = a
        else:
            print o, a
            assert False, "unhandled option"

    #filepath = '"/home/ubuntu/printbox-1.0-SNAPSHOT/' + filepath.strip('"') + '"'
    print " Printing with andrewID["+andrewId+"] and file["+filepath+"]"
    print " cwd: %s " % (os.getcwd())
    assert( andrewId != '-1' and filepath != '-1')
    # Print the file
    # Check that there is a folder
    #scriptpath = os.path.dirname(os.path.realpath(__file__))
    filepath = os.path.join(os.getcwd(), filepath.strip('"'))
    print "filepath: %s " % filepath
    assert(os.path.exists(filepath))

    # Set up the printer
    #conn = cups.Connection()
    #printers = conn.getPrinters()
    #assert(len(printers) == 1)
    #for printer in printers:
    #    print printer, printers[printer]["device-uri"]
        #print dir(printer)
        #defaultPrinter = printers[0]

    # Print using lpr from the command line
        # Set up a printer with no specified user.
    # Uncomment this line to enable printing.
    subprocess.call(['lp', '-U', andrewId, '-d','printBox', filepath])

if __name__ == "__main__":
    main()

