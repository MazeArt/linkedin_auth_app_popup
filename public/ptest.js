
const https = require('https');

function get_token(){
    console.log("FUNCTIN GET TOKEN CALLED");
    var accessToken = localStorage.getItem("access_token");
    console.log("this is the access token: " + accessToken)
}





// ---------------------------------------------------------------------------------------------------------------------
// Lin Post Data 
// ---------------------------------------------------------------------------------------------------------------------


let title = "Hola Mundo!";
let text = "Probando la Api de Linkedin!";
let shareUrl = "https://www.microsoft.com/es-cl/"
let shareThumbnailUrl = "https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej-760x400.png"

let btn = document.getElementById("do-call");
btn.addEventListener('click', event => {
    
    var accessToken = localStorage.getItem("access_token");

    getLinkedinId(accessToken).then(ownerId => {
        postShare(accessToken, ownerId, title, text, shareUrl, shareThumbnailUrl).then(r => {
            console.log(r); // status 201 signal successful posting
        }).catch(e => console.log(e));
    }).catch(e => console.log(e));

    
    console.log("Función Post Ejecutada");
});

// ---------------------------------------------------------------------------------------------------------------------
// Generic Node.js API to post on LinkedIn
// ---------------------------------------------------------------------------------------------------------------------

// Get LinkedIn ID, i.e. ownerId
function getLinkedinId(accessToken) {
    return new Promise((res, rej) => {
        let hostname = 'api.linkedin.com';
        let path = '/v2/me';
        let method = 'GET';
        let headers = {
            'Authorization': 'Bearer ' + accessToken,
            'cache-control': 'no-cache',
            'X-Restli-Protocol-Version': '2.0.0'
        };
        let body = ''
        _request(method, hostname, path, headers, body).then(r => {
            res(JSON.parse(r.body).id)
        }).catch(e => rej(e))

     console.log("executing getlinkedin .. ");   
    })
}

// Publish content on LinkedIn
function postShare(accessToken, ownerId, title, text, shareUrl, shareThumbnailUrl) {
    return new Promise((res, rej) => {
        let hostname = 'api.linkedin.com';
        let path = '/v2/shares';
        let method = 'POST';
        let body = {
            "owner": "urn:li:person:" + ownerId,
            "subject": title,
            "text": {
                "text": text // max 1300 characters
            },
            "content": {
                "contentEntities": [{
                    "entityLocation": shareUrl,
                    "thumbnails": [{
                        "resolvedUrl": shareThumbnailUrl
                    }]
                }],
                "title": title
            },
            "distribution": {
                "linkedInDistributionTarget": {}
            }
        }
        let headers = {
            'Authorization': 'Bearer ' + accessToken,
            'cache-control': 'no-cache',
            'X-Restli-Protocol-Version': '2.0.0',
            'Content-Type': 'application/json',
            'x-li-format': 'json',
            'Content-Length': Buffer.byteLength(JSON.stringify(body))
        };
        _request(method, hostname, path, headers, JSON.stringify(body)).then(r => {
            res(r);
        }).catch(e => rej(e))
    })
}

// Generic HTTP requester
function _request(method, hostname, path, headers, body) {
    return new Promise((resolve, reject) => {
        let reqOpts = {
            method,
            hostname,
            path,
            headers,
            "rejectUnauthorized": false // WARNING: accepting unauthorised end points for testing ONLY
        };
        let resBody = "";
        let req = https.request(reqOpts, res => {
            res.on('data', data => {
                resBody += data.toString('utf8');
            });
            res.on('end', () => {
                resolve({
                    "status": res.statusCode,
                    "headers": res.headers,
                    "body": resBody
                })
            });
        });
        req.on('error', e => {
            reject(e);
        });
        if (method !== 'GET') {
            req.write(body);
        }
        req.end();
    })
}


