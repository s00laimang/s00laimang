import type { Seg } from "./story-prose";

// Each story is one continuous piece of writing, told the way the site talks:
// sentences with the real logos dropped in right after the thing they name.
// Facts come from the project repos, git history, design docs and Claude
// sessions on this machine (researched 2026-10-21). Anything that couldn't be
// verified there is left out.

export type Block =
  | { p: Seg[] }
  | { quote: string; by: string }
  | { stats: { value: string; label: string }[] };

export type Story = {
  role: string;
  year: string;
  // honest label for work done on spec, shown as a pill
  kind?: string;
  headline: Seg[];
  blocks: Block[];
};

const i = (icon: string, alt: string, extra: Partial<Exclude<Seg, string>> = {}): Seg => ({
  icon,
  alt,
  ...extra,
});

const ASKOGA = i("/story/askoga-bot-light.png", "askOga", { dark: "/story/askoga-bot-dark.png" });
const PAYFRICA = i("/story/payfrica-token.png", "Payfrica");
const KINTA = i("/story/kinta-sme-logo.png", "Kinta SME");
const RESELLOS = i("/story/resellos-logo.svg", "Resellos");
const LOOTA = i("/story/loota-mark.png", "Loota");
const WHATSAPP = i("/story/whatsapp.com.ico", "WhatsApp");
const SUI = i("/story/sui.png", "Sui");
const POSH = i("/story/posh-logo.svg", "Posh Party Hire");
const ARPS = i("/story/arps-icon.png", "Allround Pro Services");
const LJW = i("/story/ljw-logo.jpg", "LJW Concrete Solutions");

export const STORIES: Record<string, Story> = {
  askoga: {
    role: "Founder · design & engineering",
    year: "2026",
    headline: [
      "I'm building",
      ASKOGA,
      " askOga, a director that tells Nigerian creators exactly what to post.",
    ],
    blocks: [
      {
        p: [
          "Content creation might be the biggest job market in Nigeria that almost nobody can get into. Most people aren't short on talent. They freeze in front of the camera, and they have no idea what to post.",
        ],
      },
      {
        p: [
          "So in July 2026 I started",
          ASKOGA,
          " askOga. It's a director, not a chatbot: it tells you what to shoot, word for word and shot by shot. It even starts you on a ladder, so your first video never needs your face.",
        ],
      },
      {
        p: [
          "A director needs taste, so I built it a library of posts that work. I share a post and a voice note with a Telegram",
          i("/story/telegram.svg", "Telegram"),
          " bot, Groq's Whisper transcribes me (I tested it on Nigerian English first, 26.5% word error against 40% for the alternative), and every post becomes a careful row in Postgres",
          i("/skills/postgresql.svg", "Postgres"),
          ".",
        ],
      },
      {
        quote: "40 careful rows beat 400 sloppy ones, because sloppy rows can't go in a prompt.",
        by: "my design notes",
      },
      {
        p: [
          "Then I deleted half of it. The machine was making the judgment calls and I was clicking approve. On 28 August I removed 48 bot files, 24 corpus files, 18 migrations and 13 tables. Now I make the calls and the machine helps.",
        ],
      },
      {
        p: [
          "The first tweet askOga directed got 13 views and zero likes. I was happy about it: it showed me exactly where the serving logic was wrong.",
        ],
      },
      {
        quote:
          "A 13-view tweet that teaches the serving logic is worth more than a fluke 5K-view tweet that teaches nothing.",
        by: "the askOga spec",
      },
      {
        p: [
          "Today the landing page and waitlist are live, and the director is coming together: it matches an idea to you, fills it in, then a verifier checks the result, and that verifier has already caught the model inventing a meme clip nobody chose.",
        ],
      },
      { stats: [{ value: "414", label: "commits in six weeks" }] },
    ],
  },

  payfrica: {
    role: "Frontend developer",
    year: "2024 & 2026",
    headline: [
      "Twice now I've helped",
      PAYFRICA,
      " Payfrica tell people how fast crypto turns into cash.",
    ],
    blocks: [
      {
        p: [
          "I first worked on",
          PAYFRICA,
          " Payfrica's frontend in 2024. Payfrica turns stablecoins like USDC",
          i("/story/usdc.png", "USDC"),
          " into Naira",
          i("/story/naira.png", "Naira"),
          ", sells airtime and data for crypto, and lets you send money as a link.",
        ],
      },
      {
        p: [
          "In July 2026 they came back for a rebrand of payfrica.xyz, and I shipped the whole new landing page in one go: 58 files on 20 July.",
        ],
      },
      {
        p: [
          "The part I'm proudest of is the sentence that explains Payfrica. You swap stablecoins across Base",
          i("/story/base.png", "Base"),
          ", Avalanche",
          i("/story/avalanche.png", "Avalanche"),
          " and Sui",
          SUI,
          ", and each word lights up as you scroll, with the logo right next to what it names. This page is written the same way.",
        ],
      },
      {
        stats: [
          { value: "600+", label: "signups" },
          { value: "160+", label: "active users" },
          { value: "$30K", label: "volume settled" },
        ],
      },
      {
        p: [
          "Under it, the numbers count up the moment they scroll into view. In October 2026 they brought me back again, this time to redesign the Bridge, the app where the swapping actually happens.",
        ],
      },
    ],
  },

  kintasme: {
    role: "Founder",
    year: "2025",
    headline: [KINTA, " Kinta SME sells data and airtime around the clock. It started with six webhooks in one day."],
    blocks: [
      {
        p: [
          "In March 2025 I wanted people to buy data without waiting for a vendor who's asleep at 2am. So I built",
          KINTA,
          " Kinta SME: fund a wallet once, then buy data and airtime for MTN",
          i("/story/mtn.png", "MTN"),
          ", Airtel",
          i("/story/airtel.png", "Airtel"),
          ", Glo",
          i("/story/glo.png", "Glo"),
          " and 9mobile",
          i("/story/9mobile.png", "9mobile"),
          " any time of day.",
        ],
      },
      {
        p: [
          "The first wall was money coming in. Wallet funding runs on bank webhooks, and they did not want to work. I went from one provider to another to dedicated accounts, and on 15 March I shipped six versions of the webhook before it held.",
        ],
      },
      { quote: "webhook v1, v2, v3, v4, v5, v6", by: "my commit log, 15 March 2025" },
      {
        p: [
          "It launched on 18 March and the firefighting started the same day. The fix that mattered: every purchase now takes your money and writes a pending order in a single database step, and only then asks the network to deliver. If delivery fails, nobody loses money without a record, and a refund is one button in the admin.",
        ],
      },
      {
        p: [
          "Then came referrals, a second data provider, an Android app, and a rough July with more than 30 commits simply called “fix”. In August I moved delivery to VTPass",
          i("/story/vtPass-logo.jpeg", "VTPass"),
          ".",
        ],
      },
      { stats: [{ value: "205", label: "commits on the main app" }] },
      {
        p: [
          "The rails turned out to be worth more than the shop. They now power",
          RESELLOS,
          " Resellos, where anyone can run their own data business on top of them.",
        ],
      },
    ],
  },

  resellos: {
    role: "Creator",
    year: "2025–2026",
    headline: [RESELLOS, " Resellos gives anyone their own data and airtime business, running on", KINTA, " Kinta's rails."],
    blocks: [
      {
        p: [
          "Plenty of people want to sell data and airtime. Almost nobody wants to build a website, wire up providers and chase payments to do it. So in December 2025 I started",
          RESELLOS,
          " Resellos.",
        ],
      },
      {
        p: [
          "Every store gets its own address, its own customers, wallet, prices and theme, and even its own login, so two stores never share a session.",
        ],
      },
      {
        p: [
          "Behind the counter there are 15 provider switches, 13 of them on. Stores that join through a partner like",
          KINTA,
          " Kinta SME sell through that partner, using the owner's own key. Payments come in through Paystack",
          i("/story/paystack.svg", "Paystack"),
          " and Billstack",
          i("/story/billstack-logo.png", "Billstack"),
          ".",
        ],
      },
      {
        p: [
          "The day before launch, account numbers stopped matching their merchants. I fixed it with hours to spare.",
        ],
      },
      { quote: "fixing b4 launching", by: "my commit log, 17 April 2026" },
      {
        p: [
          "In April every store got a free tier and publishes itself. In May I gave every store a WhatsApp",
          WHATSAPP,
          " bot that sells for you, shipped in six merged pull requests.",
        ],
      },
      { stats: [{ value: "13", label: "providers switched on" }] },
    ],
  },

  loota: {
    role: "Co-founder & engineer",
    year: "2026",
    headline: [LOOTA, " Loota is a marketplace that lives in", WHATSAPP, " WhatsApp. Search almost broke it."],
    blocks: [
      {
        p: [
          "In May 2026 we started",
          LOOTA,
          " Loota: tell it what you want in WhatsApp",
          WHATSAPP,
          ", it finds sellers near you, compares their offers, and holds the money in escrow when a deal feels risky.",
        ],
      },
      {
        p: [
          "The hardest part wasn't WhatsApp. It was search. Ask for an “iphone 17” and it proudly offered a 17 Pro Max. Ask for an “iphone 15 pro max” and it suggested an AirTag.",
        ],
      },
      {
        p: [
          "I tried hand-written rules for model numbers and brands, then moved to a reranker with a “say nothing” cutoff, tuned on 60 test cases. For a while the cutoff did nothing at all: an empty setting was being read as zero.",
        ],
      },
      {
        p: [
          "Then the bill arrived. One WhatsApp message was costing about $0.46 in AI, which is $460 for every thousand messages. Caching the prompt and loading tools only when they're needed is how we bring that down.",
        ],
      },
      { stats: [{ value: "$0.46", label: "AI cost per message, before the fix" }] },
      {
        p: [
          "Escrow went in over four phases, and I wrote the deal room's rules the way I'd want a friend to treat me.",
        ],
      },
      { quote: "never tell a seller their offer is saved when it isn't", by: "a Loota commit" },
      {
        p: [
          "Over 900 commits later, Loota is in production and looking for its first hundred users.",
        ],
      },
    ],
  },

  voultron: {
    role: "Full-stack developer · Voultron Games",
    year: "2025–2026",
    headline: [
      "At",
      i("/logos/voultron.svg", "Voultron"),
      " Voultron I built Panther Wheel, a multiplayer game where everyone sees the same spin.",
    ],
    blocks: [
      {
        p: [
          "I started Panther Wheel in September 2025. Two days later my commit said “panther wheels 90%”. It was not 90%.",
        ],
      },
      {
        p: [
          "The real work was the multiplayer part: everyone has to see the same wheel at the same moment, place bets, and get paid out fairly. I built the backend on Convex",
          i("/skills/convex.svg", "Convex"),
          ": sessions, settlement and scoring, and fought bugs like everyone betting on a single pot and players getting kicked out mid-game.",
        ],
      },
      {
        p: [
          "In January, refreshing the page dropped players back to the start of the round, so I built phase restoration: come back and you land exactly where you left off.",
        ],
      },
      {
        p: [
          "On 3 February 2026 it went live on Sui",
          SUI,
          " mainnet with real wallets and on-chain rewards. In March I added voice chat on LiveKit",
          i("/skills/livekit.svg", "LiveKit", { invert: true }),
          ", so players could actually talk while the wheel spun.",
        ],
      },
      { stats: [{ value: "467", label: "of the 642 commits are mine" }] },
      {
        p: [
          "Later the game moved to plain email and Google sign-in, so anyone can play without a crypto wallet. Along the way I built a second game, Spin Rush.",
        ],
      },
    ],
  },

  dreamclean: {
    role: "Design & build",
    year: "2026",
    kind: "Pitch site",
    headline: [
      "I found a Melbourne cleaning family on Instagram and built them the website they didn't have yet.",
    ],
    blocks: [
      {
        p: [
          "The Dream Clean Agency has looked after Melbourne homes for 27 years. They had an Instagram account, and every enquiry went through a Google Form linked in the bio. No website.",
        ],
      },
      {
        p: [
          "So I built them one to pitch with, and the star is the quote form. I wanted it to feel like the stack of cards on a dating app: answer one and it slides away.",
        ],
      },
      {
        quote: "you know how dating apps used to have these stack cards… when you answer, it fades out.",
        by: "me, explaining the idea",
      },
      {
        p: [
          "Behind the cards are 20 steps that branch by service: home or commercial cleaning, end of lease, gardening, NDIS, or “not sure”. The first card asks the only two things that matter, what and where. Pick several services and a single date card covers all of them. Refresh the page and your answers are still there.",
        ],
      },
      { stats: [{ value: "20", label: "steps, branched by service" }] },
      {
        p: [
          "It asks the same questions as their Google Form, so nothing changes for them except more people finishing it. I emailed it to them on 20 October with the subject “I made a website for The Dream Clean Agency”. The site is waiting for them.",
        ],
      },
    ],
  },

  virzi: {
    role: "Design & build",
    year: "2026",
    kind: "Pitch site",
    headline: ["A young builder with great work and no website. I gave them one in 26 hours."],
    blocks: [
      {
        p: [
          "Virzi Projects has been a company since November 2025. The workmanship is beautiful, the Instagram has a couple of hundred followers, and there was no website and no phone number in the bio.",
        ],
      },
      {
        p: [
          "My brief to myself: make a young company look as established as its workmanship. So I went dark and minimal, and let the finished projects carry it in a grid.",
        ],
      },
      {
        p: [
          "Every service became a small live 3D drawing that turns once it's built: a kitchen for renovations, a table for extensions, a house for new builds, a deck, and a sauna trailer for custom carpentry.",
        ],
      },
      {
        p: [
          "Phones fought back. The drawings got cut off and the whole page slid sideways. I fixed both the next morning, and it went live about 26 hours after the first line of code.",
        ],
      },
      { stats: [{ value: "26 hrs", label: "from first line to live" }] },
      { p: ["I sent it to them over Instagram. Now we wait."] },
    ],
  },

  brisbanepartyhire: {
    role: "Design & build",
    year: "2026",
    kind: "Unsolicited redesign",
    headline: [
      i("/story/brisbanepartyhire-logo.svg", "Brisbane Party Hire"),
      " Brisbane Party Hire's website told Google they were in Victoria. So I redesigned it.",
    ],
    blocks: [
      {
        p: [
          "I went looking at Brisbane Party Hire's site and found the map location in its code pointed to western Victoria, about two states away from their customers.",
        ],
      },
      {
        p: [
          "That was one of nine things I noted: phone numbers that disagreed, opening hours that disagreed, and a whole catalogue of products listed at $0.",
        ],
      },
      {
        p: [
          "So I redesigned it without being asked. An illustrated marquee at dusk sets the mood before anyone reads a word, products appear as die-cut stickers you can drag around, and butterflies from five Queensland species fly around with real physics and land on the buttons.",
        ],
      },
      { p: ["They also landed on the buttons a little too well and blocked people from clicking them. That got fixed."] },
      {
        quote:
          "This site is very unique. It's making it feel like it is talking to the potential clients, not generic like the rest.",
        by: "me, the day it came together",
      },
      { stats: [{ value: "5", label: "species of butterfly" }] },
      {
        p: [
          "The email went out at 9am Brisbane time with the subject “Your website tells Google you're in Victoria”. Follow-ups are scheduled.",
        ],
      },
    ],
  },

  poshpartyhire: {
    role: "Design & build",
    year: "2026",
    kind: "Pitch site",
    headline: [
      POSH,
      " Perth gives Posh Party Hire 4.8 stars on Google. The only way to book was a DM.",
    ],
    blocks: [
      {
        p: [
          "Emina runs",
          POSH,
          " Posh Party Hire: photo booths, backdrops, an audio guestbook and acrylic signs for weddings and parties around Perth. 19 of her 20 Google reviews are five stars.",
        ],
      },
      {
        p: [
          "There was no website and no link in her bio. A bride planning months ahead couldn't see a package, a gallery or whether her date was free without sending a message first.",
        ],
      },
      {
        p: [
          "So I built her one. It opens like a photo booth on burst mode: one print flips through 27 of her photos, faster and faster, then a flash goes off and the page swings open like a wedding album.",
        ],
      },
      {
        p: [
          "Her hire items lie on a party table: a photo strip, the guestbook phone, pearls, a disco ball. They drift with your cursor, and you can pick them up and move them.",
        ],
      },
      {
        p: [
          "Eight real reviews became guest book pages with wax seals. And instead of a form, you fill in the blanks of a note to Emina. Send it and a stamp presses onto a tear-off calendar page. It says sent, not booked, because only Emina can confirm a date.",
        ],
      },
      { quote: "Perfect. This is the missing piece.", by: "me, when the heading font went in" },
      {
        stats: [
          { value: "4.8", label: "stars from 20 Google reviews" },
          { value: "8", label: "reviews in the guest book" },
          { value: "27", label: "photos in the opening flip" },
        ],
      },
      { p: ["The preview is live. Emina hasn't seen it yet."] },
    ],
  },

  allroundproservices: {
    role: "Design & build",
    year: "2026",
    kind: "Pitch site",
    headline: [
      ARPS,
      " Frank does lawns, house cleans and car detailing in Adelaide. Outside Instagram, nobody could find him.",
    ],
    blocks: [
      {
        p: [
          "Frank runs",
          ARPS,
          " Allround Pro Services on his own, and every booking comes through Instagram. He posts almost every day. About 60 of his last 84 posts are the same “now taking bookings” graphic, posted again and again.",
        ],
      },
      {
        p: [
          "There was no website and no Google listing, so all that posting had nowhere to send people.",
        ],
      },
      {
        p: [
          "So I built him one without being asked. My first version wasn't good enough, so I threw it away and rebuilt it one section at a time.",
        ],
      },
      {
        p: [
          "The menu links sit on a little wheel that turns as you scroll, so it always faces the section you're reading. Tap a service at the top and the quote form opens with that service already picked.",
        ],
      },
      {
        p: [
          "The form asks how Frank should reach you: a phone number, an email or your Instagram handle. You can add up to five photos of the yard, the room or the car, straight from an iPhone.",
        ],
      },
      {
        p: [
          "There's also a note from Frank, written only from phrases in his own captions and signed in handwriting.",
        ],
      },
      { quote: "I love what you just did.", by: "me, the moment Frank's note went in" },
      { stats: [{ value: "84", label: "of his Instagram posts read before I drew anything" }] },
      { p: ["The preview is live. Frank hears about it next."] },
    ],
  },

  ljwconcrete: {
    role: "Design & build",
    year: "2026",
    kind: "Pitch site",
    headline: [
      LJW,
      " Lachy pours driveways across Wollondilly and Macarthur. His quotes started on a Linktree.",
    ],
    blocks: [
      {
        p: [
          LJW,
          " LJW Concrete Solutions is Lachy Wells and his crew: driveways, shed slabs, paths and pool surrounds. His posts name 22 suburbs where they've poured.",
        ],
      },
      {
        p: [
          "With no website, anyone who wanted a quote went from his Instagram bio to a Linktree to a Jotform. His reels keep getting more likes, and none of that attention landed anywhere he owned.",
        ],
      },
      {
        p: [
          "So I built him a site that feels like his trade: heavy, tight and stacked. Every button, title and menu is a Tetris piece that locks into the next.",
        ],
      },
      {
        p: [
          "Recent jobs play like a short film. Each one steps through real photos, from the dig to the mesh to the finished slab, while a job sheet written from his captions lights up the stage you're on.",
        ],
      },
      {
        p: [
          "The areas he covers are four Tetris pieces laid over the real map, with every suburb from his posts marked on top. The quote form takes your suburb, the job, its size and up to four photos, so Lachy sees the job before he calls you back.",
        ],
      },
      { quote: "Perfect. I love this now.", by: "me, when the job sheet clicked" },
      {
        stats: [
          { value: "87", label: "Instagram posts read" },
          { value: "348", label: "job photos to pick from" },
          { value: "22", label: "suburbs on the map" },
        ],
      },
      { p: ["The preview is live. Lachy's message is next."] },
    ],
  },
};
