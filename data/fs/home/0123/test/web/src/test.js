import {timeout,print} from "./util.js";
for (let i=0;i<10;i++){
    print(i);
    await timeout(100);
}