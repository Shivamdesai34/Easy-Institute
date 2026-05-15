# import json

# file_path = r'D:\Shivam\Karthik_students\studentslive_25042025\package.json'

# with open(file_path, 'r', encoding='utf-8') as file:
#     data = json.load(file)

# # Print entire JSON content
# print(data)

# # Example: Access specific fields
# print("Name:", data.get("name"))
# print("Version:", data.get("version"))

import json
import os

file_path = r'package.json'
batch_file_path = "mybuild.bat"


with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)


version = data.get("version")  
major, minor, patch = map(int, version.split('.'))


patch += 1
new_version = f"{major}.{minor}.{patch}"
data["version"] = new_version

print(f"Updated version: {new_version}")

with open(file_path, 'w', encoding='utf-8') as file:
    json.dump(data, file, indent=2)

updated_version = data["version"]
os.system(f'"{batch_file_path}"')
print('daata',updated_version)



