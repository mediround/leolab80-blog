---
title: "How I Used AI to Build an AI Chatbot That Helps Medical Interpreter-Coordinators"
description: "How I built Chiron, an AI chatbot for international patient consultations, balancing accuracy with consultation time, plus question tests and four essentials."
sourceDate: "2026-10-12T23:18:30"
---

I built an AI chatbot for MyClinic that supports medical interpreter-coordinators when they consult with international patients. Its role is to help a medical interpreter-coordinator, in the middle of a consultation with an international patient, find clinic information, prices, and procedure descriptions and answer more accurately. International patients don't talk to the AI chatbot; a person does the consulting, with help from the AI chatbot. I named the AI chatbot Chiron. I'm told it is the name of the teacher who taught countless heroes in Greek mythology.

## International patients need accurate information.

International patients ask whether the price is really this amount, how many days recovery takes, and whether they can have the procedure in their condition. When they ask, we check everything with the clinic, from the price to whether the procedure is possible given the client's condition. If we give an old price or an inaccurate recovery period, it also causes problems for the client's visit plans. So rather than having the AI chatbot talk directly with clients, I made it something coordinators use to prepare their answers. It puts a person in place to check the information before it reaches the client.

<figure>
<div class="fig-body"><div class="fig-box wide"><b>Client</b><small>Asks about price · recovery period · whether a procedure is possible</small></div><div class="fig-down arrow both"><i></i></div><div class="fig-box wide"><b>Medical interpreter-coordinator</b><small>Reviews the AI's answer, checks what's needed with the clinic, then passes it on to the client</small></div><div class="fig-down arrow both"><i></i></div><div class="fig-box invert wide"><b>Chiron</b><small>The AI chatbot coordinators use to prepare answers</small></div><div class="fig-down arrow both"><i></i></div><div class="fig-box wide"><b>Data</b><small>Curated dataset · procedure information database</small></div></div>
<figcaption>How Chiron is designed · A person checks the information before it reaches the client</figcaption>
</figure>

## But I had to cut the time it takes to find answers.

When I calculated how much time goes into communication for one client, from the first inquiry until their treatment is finished, it came to nearly 10 hours. Answering similar questions also kept repeating: procedure costs and recovery periods, clinic locations and opening hours, the languages available for consultation. A coordinator with less experience has to look things up or ask someone else to answer questions like these. If a price is quoted from memory, or several procedures are done at once, the amount can differ from the one on the site, so the checking repeats. I wanted to cut that time with an AI chatbot.

## Some things the AI chatbot can answer, and some must be checked with the medical team.

Even after building Chiron, I test it again and again. It's an internal test: I put in questions a coordinator might ask during a consultation and look at the answers.

**Recovery period.** When I asked, “A client is asking how many days they need to rest after double eyelid surgery,” Chiron searched the dataset of procedure information and answered. It explained the time until returning to daily life and flying home, and the difference in swelling between the buried-suture method and the incisional method, and it cited its source. It explained that this period does not mean full recovery.

**Medical judgment.** For the question “A client who takes blood pressure medication is asking whether they can get ultrasound lifting,” Chiron did not judge whether it was possible. Since the medication and health condition need to be reviewed, it answered that this should be checked with the medical team in charge. It also provided a sentence for asking the client to tell the medical team which medications they are taking. This is something an AI chatbot should not answer, so Chiron's answer was the right one.

**Prices by clinic.** When I asked, “Tell me which clinics do Botox and their prices,” it showed only prices that the clinics had confirmed. The amounts were regular prices for a single session, including VAT. It also added a note that each clinic has different standards for product, dose, and area, so the prices may be hard to compare as they are. Clinics that had not confirmed yet were marked as not yet confirmed, with no amount.

**Message wording.** When I said, “Please write a LASIK consultation booking confirmation message in English,” it wrote an English message. It left blanks for the parts a medical interpreter-coordinator needs to fill in, such as the clinic name and address.

<figure>
<div class="fig-body fig-chat"><div class="fig-chat-q c0">A client is asking how many days they need to rest after double eyelid surgery</div><div class="fig-chat-a c1"><small>Chiron</small><span class="fig-chat-status" aria-hidden="true">Looking up the data…</span><p class="c2">Here is the recovery period after double eyelid surgery, with guidance notes.</p><ul><li class="c3"><b>Returning to daily life and flying home</b>: We recommend allowing about <b>7 days</b> (based on when returning to daily life and flying home are possible, not on full healing or recovery of appearance).</li><li class="c4"><b>Recovery by surgical method</b>:<ul><li class="c5"><b>Buried-suture method</b>: Swelling goes down relatively quickly.</li><li class="c6"><b>Incisional method</b>: Early swelling and bruising stand out for 1–2 weeks, and stitches are usually removed a few days after surgery. It takes weeks to months for the crease to look natural.</li></ul></li><li class="c7"><b>Tips for client consultations</b>:<ul><li class="c8">Given the early swelling and bruising, please advise the client to leave enough time before any important plans.</li><li class="c9">If the incisional method is used, confirm in advance the schedule for a return visit to the clinic for stitch removal (or whether it can be handled locally after returning home).</li></ul></li></ul><span class="fig-chat-src c10">Source: Procedure Wiki — new dataset</span></div></div>
<figcaption>A coordinator asks and Chiron answers<br>Source: MyClinic Chiron production screen</figcaption>
</figure>

## Four things I needed to build the AI chatbot Chiron

**1. Verified data**

I gathered clinic information, prices for each procedure, and procedure descriptions, and had the clinics confirm them again. This was the task that took the longest. I set Chiron up to look up the curated dataset and the procedure information database, and to give prices only for clinics that had confirmed them. Keeping the data up to date takes an enormous amount of work.

**2. An AI model that can use tools**

Chiron uses the Google Gemini API. During development, I compared several models, including ChatGPT and Claude, by asking them the same questions, and then chose one. Watching the quality of its answers, I'm also considering changing it later.

**3. Tools that read data**

I connected 11 of MyClinic's internal functions: quote calculation, clinic search and clinic details, price search, two Procedure Wiki functions, inquiries and work status, coordinator search and summaries, and goal progress lookup. All of them can only read data, not write it. I did not include any function that changes bookings or sends messages to clients.

**4. Tests checked against correct answers**

I set up a separate harness that tests it with the actual instructions and questions.

| Component | What it does | Technology and tools used in Chiron |
|---|---|---|
| Verified data | Gathers clinic information, prices for each procedure, and procedure descriptions, and confirms them again with the clinics | Curated dataset · procedure information database |
| An AI model that can use tools | Uses tools to find data and build answers | Google Gemini API |
| Tools that read data | Only reads data, never writes it | 11 MyClinic internal functions (quote calculation · clinic search and clinic details · price search · two Procedure Wiki functions · inquiries and work status · coordinator search and summaries · goal progress lookup) |
| Tests checked against correct answers | Tests answers with the actual instructions and questions | A separate test harness |

If developing it yourself is hard, you could also consider putting your price list and procedure description files into a general-purpose AI service and testing the answers with questions whose correct answers you already know. That said, I'm not sure improvement would be sustainable this way. If you use files, you have to update them whenever prices change, and you also have to check the number of clinics and the price comparison results against the source data.

Managing the data is the hardest part. Confirming clinic information and keeping it up to date takes constant work.
