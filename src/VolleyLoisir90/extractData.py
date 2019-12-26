import requests
import lxml.html as lh
import json

url = 'http://volleyloisir90.free.fr/classementpouleB.htm'

# Create a handle, page, to handle the contents of the website
page = requests.get(url)

# Store the contents of the website under doc
doc = lh.fromstring(page.content)

# Parse data that are stored between <tr>..</tr> of HTML
tr_elements = doc.xpath('//tr')

# Create empty list
data = []

# Since out first row is the header, data is stored on the second row onwards
for j in range(3, len(tr_elements) - 1):
    # j-th row
    foo = tr_elements[j]
    row = []

    # Iterate through each element of the row
    for t in foo.iterchildren():
        a = t.text_content()
        if "BAVILLIERS" in a:
            a = "BAVILLIERS 1"
        row.append(a)

    data.append(row)

with open('./data.json') as f:
    json_old_data = json.load(f)

# Save everything if new data
if data == json_old_data:
    print('New data found')
    json_new_data = json.dumps(data)
    with open("data.json", "w") as f:
        f.write(json_new_data)
else:
    print('Data is up to date')
