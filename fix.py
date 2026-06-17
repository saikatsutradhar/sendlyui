with open('notepad.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Line 861 is lines[860], Line 1055 is lines[1054]
del lines[860:1055]

with open('notepad.html', 'w', encoding='utf-8') as f:
    f.writelines(lines)
print('Fixed')
