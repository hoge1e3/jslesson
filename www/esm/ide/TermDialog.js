import IframeDialog from "./IframeDialog.js";
import * as rpc from "../lib/rpc.js";
import ctrl from "../jsl/ctrl.js";
import URLParse from "../lib/url-parse.js";
const TermDialog={
    async getUrl(params) {
        const {TERM_URL:term_url}=await ctrl.get("BAURL/show");
        const url=term_url+"?"+URLParse.qs.stringify(params);
        console.log("url",url);
        return url;
    },
    async show(params) {
        const url=await this.getUrl(params);
        this.dialog=IframeDialog.show(url, {width:600,height:400});
        IframeDialog.iframe[0].addEventListener("load",()=>{
            console.log("Loaded",this.iframe);
        });
    },
};
export default TermDialog;
