appendStart='('
appendEnd='),'
newFileName = 'something.csv'
toModify = "something.csv"
names=open(toModify,'r')
updatedNames=open(newFileName,'a')
for name in names:
  updatedNames.write(appendStart + name.rstrip() + appendEnd + '\n')
updatedNames.close()