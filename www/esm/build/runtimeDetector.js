export function filterSameOriginUrls(urls) {
    let currentOrigin = window.location.origin;
    if (currentOrigin+""=="null") {// about:blank
        try{
            if (currentOrigin+""=="null") currentOrigin=parent.location.origin;
        }catch(e) {}
        try{
            if (currentOrigin+""=="null") currentOrigin=opener.location.origin;
        }catch(e) {}
    }
    return urls.filter((url) => {
      try {
        const parsedUrl = new URL(url, window.location.href);
        return parsedUrl.origin === currentOrigin;
      } catch (e) {
        return false;
      }
    })[0];
  }
