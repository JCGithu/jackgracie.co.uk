import React from 'react';
import '../styles/globals.scss';

export default function NotionClock({ toggleNav }) {
  toggleNav(false);
  let [alert, alertTrigger] = React.useState(false);
  let [text, textUpdate] = React.useState('');

  function textUpdater(e) {
    let value =
      e.target.value.search(/(?<=id=")\d*(?=" video)/g) !== -1
        ? e.target.value.split('id="')[1].split('" video=')[0]
        : 'No ID found';
    textUpdate(value);
  }

  return (
    <main className="id_main">
      {alert && (
        <section className="id_alert_screen">
          <div className="id_alert_box">
            <p>{text}</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(text);
                alertTrigger(false);
              }}
            >
              Copy & Close
            </button>
          </div>
        </section>
      )}
      <div className="id_block">
        <h1>Hello!</h1>
        <section>
          <h3>You can use this for the metro video widget!</h3>
          <p>Input a metro-video embed code and this site will produce the ID!</p>
        </section>
        <div className="id_input">
          <form>
            <span className="id_input_emoji" role="img">
              🎥
            </span>
            <input type="text" placeholder="Video code?" onChange={(e) => textUpdater(e)} />
            <span className="id_input_button" onClick={() => alertTrigger(true)}>
              <button onClick={(e) => e.preventDefault()}>Get ID</button>
            </span>
          </form>
        </div>
      </div>
    </main>
  );
}
