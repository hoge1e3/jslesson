import IframeDialog from "./IframeDialog.js";
import * as rpc from "../lib/rpc.js";
import ctrl from "../jsl/ctrl.js";
import URLParse from "../lib/url-parse.js";
const TermDialog={
    async show(params) {
        const {TERM_URL:term_url}=await ctrl.get("BAURL/show");
        const url=term_url+"?"+URLParse.qs.stringify(params);
        console.log("url",url);
        this.dialog=IframeDialog.show(url);
        IframeDialog.iframe[0].addEventListener("load",()=>{
            console.log("Loaded",this.iframe);
        });
    },
};
export default TermDialog;
