import os
import shutil
   
def copyRecursively(source,destination):
   shutil.copytree(source, destination)