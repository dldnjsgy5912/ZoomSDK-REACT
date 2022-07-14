import React from 'react';

import './App.css';
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.5.0/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('ko-KO');
ZoomMtg.i18n.reload('ko-KO');

function App() {

  // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
  var signatureEndpoint = '/zoom'
  //8mVSv2AgO2MLAleEXCeaGmmJLERo4hFkVfHG
  // This Sample App has been updated to use SDK App type credentials https://marketplace.zoom.us/docs/guides/build/sdk-app
  var apiKey = 'A_Tn1pb3SL21Mb9yI0LIIQ'
  var meetingNumber = 83222587905

  var role = 0
  var leaveUrl = 'http://localhost:3000'
  var userName = 'React'
  var userEmail = ''
  var passWord = '9C7UbH'
  // pass in the registrant's token if your meeting or webinar requires registration. More info here:
  // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-registered
  // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-registered
  var registrantToken = ''

  const getSignature = (e) => {
    e.preventDefault();
    return new Promise((resolve, reject) => {
      try {
        const signature = ZoomMtg.generateSignature({
          meetingNumber: meetingNumber,
          apiKey: "A_Tn1pb3SL21Mb9yI0LIIQ",
          apiSecret: 'NbereRrHoNOnh6pCNvfrmSqlNUvJ6SSd9wXe',
          role: role,
        });
        resolve(signature);
         startMeeting(signature)
      } catch (e) {
        reject(Error("generate signature rejected"));
      }
    });
  };


  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          tk: registrantToken,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>

        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default App;
