Spreadsheet Reader
===

You need two environment variable:

GOOGLE_SPREADSHEET_ID - The ID of the spreadsheet  
GOOGLE_SPREADSHEET_RANGE - [name_of_the_sheet]**!**[first_cell]**:**[last_cell]

E.g.  
GOOGLE_SPREADSHEET_ID="1NypERxWOeG_VbfKmopOjGZyTDumZVKQfIjph5H60"  
GOOGLE_SPREADSHEET_RANGE="Main Sheet!A3:F2000"

You can also update the `majorDimension` variable directly from the code ('ROWS' vs. 'COLUMNS')
