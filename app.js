
const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
}


/* =========================
   APP STATE
========================= */

const state = {
  page: "home",

  xp: 8450,

  level: 12,

  stars: 1240,

  ref: "SPIDER24",

  claimed: new Set()
};


/* =========================
   MAIN SCREEN
========================= */

const screen = document.getElementById("screen");


/* =========================
   PAGES
========================= */

const pages = {

  /* =========================
     HOME
  ========================= */

  home: () => `
    <div class="content">

      <section class="hero">

        <div class="web">🕷️</div>

        <h1>SPIDER WEB NETWORK</h1>

        <p class="muted">
          Play · Earn · Connect · Collect
        </p>

        <div class="level">

          <div>
            <strong>${state.level}</strong>
            <span class="muted">
              Web Level
            </span>
          </div>

          <div>
            <strong>${state.xp.toLocaleString()}</strong>
            <span class="muted">
              XP / Stars
            </span>
          </div>

        </div>

      </section>


      <div class="section-title">
        Daily Reward
      </div>


      <div class="card reward">

        <div>

          🎁 <b>Daily Reward</b>

          <div class="muted">
            Claim your daily reward
          </div>

        </div>

        <button
          class="btn"
          onclick="claim('daily')"
        >
          ${
            state.claimed.has("daily")
              ? "Claimed"
              : "Claim"
          }
        </button>

      </div>


      <div class="section-title">
        Quick Access
      </div>


      <div class="grid">

        <div
          class="card quick"
          onclick="go('games')"
        >
          🎮

          <b>Games</b>

          <span class="muted">
            Play & earn XP
          </span>

        </div>


        <div
          class="card quick"
          onclick="go('tasks')"
        >
          ☑️

          <b>Tasks</b>

          <span class="muted">
            Complete missions
          </span>

        </div>


        <div
          class="card quick"
          onclick="go('friends')"
        >
          👥

          <b>Frens</b>

          <span class="muted">
            Invite friends
          </span>

        </div>


        <div
          class="card quick"
          onclick="alert('NFT Hub coming in the next build')"
        >
          💎

          <b>NFT Hub</b>

          <span class="muted">
            Collect NFTs
          </span>

        </div>

      </div>


      <div class="section-title">
        Top Global Rank
      </div>


      <div class="card reward">

        🏆

        <b>#245</b>

        <button
          class="btn"
          onclick="go('ranking')"
        >
          Leaderboard
        </button>

      </div>

    </div>
  `,


  /* =========================
     GAMES
  ========================= */

  games: () => `

    <div class="content">

      <div class="section-title">
        SPIDER TIC-TAC-TOE
      </div>


      <div
        class="card"
        style="padding:16px;text-align:center"
      >

        <div class="muted">

          You 🕷️

          &nbsp; VS &nbsp;

          🕸️ Opponent

        </div>


        <div
          class="board"
          id="board"
        >

          ${Array(9)
            .fill(0)
            .map(
              (_, i) => `
                <button
                  class="cell"
                  onclick="move(${i})"
                ></button>
              `
            )
            .join("")}

        </div>


        <div class="muted">

          Win +50 XP · +10 ⭐

          &nbsp;

          Draw +10 XP

        </div>


        <br>


        <button
          class="btn"
          onclick="newGame()"
        >
          New Match
        </button>

      </div>

    </div>

  `,


  /* =========================
     TASKS
  ========================= */

  tasks: () => `

    <div class="content">

      <div class="tabs">

        <button class="active">
          Daily
        </button>

        <button>
          Weekly
        </button>

        <button>
          Special
        </button>

      </div>


      ${[
        ["🔰", "Login Daily", "+20 XP", "daily"],

        ["🎮", "Complete 3 Games", "+50 XP", "games"],

        ["⭐", "Win 1 Game", "+30 XP", "win"],

        ["👥", "Invite 1 Friend", "+50 XP +10 ⭐", "invite"],

        ["✈️", "Join Telegram Channel", "+20 XP", "channel"],

        ["𝕏", "Follow on Twitter", "+20 XP", "twitter"]

      ]
        .map(
          (x) => `

          <div class="card task">

            <div class="icon">
              ${x[0]}
            </div>


            <div>

              <b>${x[1]}</b>

              <div class="tag">
                ${x[2]}
              </div>

            </div>


            <button
              class="btn"
              onclick="claim('${x[3]}')"
            >

              ${
                state.claimed.has(x[3])
                  ? "✓"
                  : "Claim"
              }

            </button>

          </div>

        `
        )
        .join("")}


      <div class="section-title">
        Completed Tasks
      </div>


      <div class="card reward">

        ☑️

        <span>
          12 completed
        </span>

        <span class="muted">
          View history ›
        </span>

      </div>

    </div>

  `,


  /* =========================
     FRIENDS
  ========================= */

  friends: () => `

    <div class="content">

      <div class="section-title">
        FRENS & REFERRAL
      </div>


      <div class="card refbox">

        <div class="muted">
          Your Referral Code
        </div>


        <div class="code">
          ${state.ref}
        </div>


        <div class="muted">
          Your Referral Link
        </div>


        <p style="word-break:break-all">

          t.me/YourBot?start=${state.ref}

        </p>


        <button
          class="btn"
          onclick="shareRef()"
        >
          ✈ Share Link
        </button>

      </div>


      <div class="grid">

        <div class="card quick">

          <span class="muted">
            Total Friends
          </span>

          <b>
            128
          </b>

        </div>


        <div class="card quick">

          <span class="muted">
            Active Friends
          </span>

          <b>
            87
          </b>

        </div>

      </div>


      <div class="section-title">
        Referral Earnings
      </div>


      <div class="card reward">

        ⭐

        <b>
          ${state.stars.toLocaleString()}
        </b>

      </div>


      <div class="section-title">
        Referral Leaderboard
      </div>


      ${
        [
          ["@Rohan", "4,560"],

          ["@Aman", "3,210"],

          ["@Karan", "2,980"],

          ["@You", "1,240"]
        ]
          .map(
            (r, i) => `

            <div class="card rank">

              <span>
                ${i + 1}. ${r[0]}
              </span>

              <b>
                ${r[1]} ⭐
              </b>

            </div>

          `
          )
          .join("")
      }

    </div>

  `,


  /* =========================
     PROFILE
  ========================= */

  profile: () => `

    <div class="content">

      <div class="card profile">

        <div class="bigavatar">
          🕷️
        </div>


        <h2>
          ${
            tg?.initDataUnsafe?.user?.first_name ||
            "SpiderMaster"
          }
        </h2>


        <div class="muted">
          @spidermaster
        </div>


        <br>


        <span class="tag">
          TOP GLOBAL #245
        </span>


        <div class="grid">

          <div class="card quick">

            <span class="muted">
              Web Level
            </span>

            <b>
              ${state.level}
            </b>

          </div>


          <div class="card quick">

            <span class="muted">
              XP
            </span>

            <b>
              ${state.xp.toLocaleString()}
            </b>

          </div>

        </div>

      </div>


      <div
        class="card"
        style="padding:10px;margin-top:12px"
      >

        ${
          [
            ["🌐 Language", "English"],

            ["💎 My NFT Collection", "Explore"],

            ["💳 Wallet", "Connect"],

            ["🎁 Reward History", "View"],

            ["🏆 Global Ranking", "Open"],

            ["⚙ Settings", "Open"]
          ]
            .map(
              (x) => `

              <div class="row">

                <span>
                  ${x[0]}
                </span>

                <span class="muted">
                  ${x[1]} ›
                </span>

              </div>

            `
            )
            .join("")
        }

      </div>

    </div>

  `,


  /* =========================
     RANKING
  ========================= */

  ranking: () => `

    <div class="content">

      <div class="section-title">
        GLOBAL RANKING
      </div>


      ${
        [
          ["@Rohan", "125,500"],

          ["@Aman", "96,500"],

          ["@Karan", "82,450"],

          ["@SpiderMaster", "8,450"],

          ["@Vishu", "8,210"],

          ["@Devil", "7,980"],

          ["@Aryan", "7,560"],

          ["@Rocky", "6,990"]
        ]
          .map(
            (r, i) => `

            <div class="card rank">

              <span>
                ${i + 1}. ${r[0]}
              </span>

              <b>
                ${r[1]} XP
              </b>

            </div>

          `
          )
          .join("")
      }

    </div>

  `
};


/* =========================
   RENDER
========================= */

function render() {

  screen.innerHTML =
    pages[state.page]
      ? pages[state.page]()
      : pages.home();


  document
    .querySelectorAll(".nav button")
    .forEach((button) => {

      button.classList.toggle(
        "active",
        button.dataset.page === state.page
      );

    });

}


/* =========================
   NAVIGATION
========================= */

function go(page) {

  state.page = page;

  render();

  window.scrollTo(0, 0);

}


/* =========================
   CLAIM REWARD
========================= */

function claim(key) {

  if (state.claimed.has(key)) {
    return;
  }


  state.claimed.add(key);


  state.xp += 20;


  render();

}


/* =========================
   REFERRAL SHARE
========================= */

function shareRef() {

  const link =
    `https://t.me/YourBot?start=${state.ref}`;


  if (navigator.share) {

    navigator.share({

      title: "Spider Web Network",

      text: "Join me!",

      url: link

    });

  }

  else if (navigator.clipboard) {

    navigator.clipboard
      .writeText(link)
      .then(() => {

        alert("Referral link copied");

      });

  }

}


/* =========================
   TIC TAC TOE
========================= */

let board = Array(9).fill("");

let turn = true;


/* NEW GAME */

function newGame() {

  board = Array(9).fill("");

  turn = true;

  render();

}


/* PLAYER MOVE */

function move(index) {

  if (board[index] || !turn) {
    return;
  }


  board[index] = "X";

  turn = false;


  render();


  /* BOT MOVE */

  setTimeout(() => {

    const empty =
      board
        .map((value, index) =>
          value ? null : index
        )
        .filter(
          (value) => value !== null
        );


    if (empty.length) {

      const randomIndex =
        empty[
          Math.floor(
            Math.random() * empty.length
          )
        ];


      board[randomIndex] = "O";

    }


    turn = true;

    render();

  }, 350);

}


/* =========================
   NAV BUTTON EVENTS
========================= */

document
  .querySelectorAll(".nav button")
  .forEach((button) => {

    button.onclick = () => {

      go(button.dataset.page);

    };

  });


/* =========================
   START APP
========================= */

render();
