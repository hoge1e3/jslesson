import IframeDialog from "./IframeDialog.js";
import * as rpc from "../lib/rpc.js";
import ctrl from "../jsl/ctrl.js";
import "../../lib/url-parse.js";
const TermDialog={
    async show(params) {
        const {TERM_URL:term_url}=await ctrl.get("BAURL/show");
        this.dialog=IframeDialog.show(term_url);
        //URLParse.qs.stringify
        this.iframe=dialog.iframe[0];
        this.iframe.addEventListener("load",()=>{
            console.log("Loaded",this.iframe);
        });
    },
};
export default TermDialog;
