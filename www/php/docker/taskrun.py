#root@961970f8dc20:/# cd /dpy/
#root@961970f8dc20:/dpy# ls
#taskrun-1.py  taskrun-2.py  taskrun.py
#root@961970f8dc20:/dpy# cat taskrun.py
# /var/www/data/dpy/work/docker/user0001/py

# volume H:G
## {badata}/fs/pub/{pub_class.[class].url}:/host-pub
# {workdir}/{class}:/host

#H cp bada/fs/home/{class}/{user}/{project}/ work/{class}/{user}/{project}/
##G ln -s /host-pub/{pub_user.[user,project]} /host/{user}/{project}/user
##G ln -s /host-pub/{pub_class.[user="class",project="assets"]} /host/{user}/{project}/class

#H put {workdir}/{class}/tasks/req/{genid}.sh

#G mv /host/tasks/req/{genid}.sh /host/tasks/{genid}/run.sh
#G gen {workdir}/{class}/tasks/{genid}:
## run.sh
## stdout.txt
## stderr.txt
from pathlib import Path
import time
import subprocess
import sys
import threading

workdir=Path(sys.argv[1])
taskdir=Path(workdir).joinpath("tasks/")
reqdir=Path(taskdir).joinpath("req/")



def scan():
        #print ("Scan %s" % reqdir)
        files=[]
        for p in reqdir.glob("*.sh"):
                files.append(Path(p))
        files.sort(key=lambda f: f.stat().st_mtime)
        for p in files:
                #runTask(p)
                th=threading.Thread(target=runTask, args=(p,))
                th.start()

def runTask(p):
        #print (type(p))
        name=p.stem
        print ("Run %s" % (name))
        t=taskdir.joinpath(name)
        if not t.exists():
            t.mkdir()
            t.chmod(0o777)
        dst=t.joinpath("run.sh")
        p.rename(dst)
        #dst.chmod(0o777)
        (stdout,stderr)=subprocess.Popen(["sh", str(dst)],
                stdout=subprocess.PIPE, stderr=subprocess.PIPE
        ).communicate()
        stdoutF=t.joinpath("stdout.txt")
        with stdoutF.open("wb") as f:
                f.write(stdout)
        stdoutF.chmod(0o777)
        stderrF=t.joinpath("stderr.txt")
        with stderrF.open("wb") as f:
                f.write(stderr)
        stderrF.chmod(0o777)
        print("Done %s" %(name))


while True:
        time.sleep(1)
        scan()
