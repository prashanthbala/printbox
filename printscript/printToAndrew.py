#!/usr/bin/python

# python printToAndrew -andrew ANDREWID -path temp/toPrint.pdf

import getopt, sys
import os, subprocess
#import cups


QUEUE = "queuetemp" # name of temporary queueing and swap space.
TEST_FILE = "helloprinter.txt"
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

    print " Printing with andrewID:'"+andrewId+"' and file:'"+filepath+"'"
    assert( andrewId != '-1' and filepath != '-1')
    # Print the file
    # Check that there is a folder
    assert(os.path.isdir(os.path.join(os.getcwd(), QUEUE)))

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
    subprocess.call(['lp', '-U', andrewId, '-d','AndrewGeneric', filepath])

if __name__ == "__main__":
    main()

