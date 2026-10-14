---
title: "Developer Terms Worth Knowing, Even When AI Does the Coding"
description: "Commit, branch, build, CI: words you meet in vibe coding. I organized the terms you need to judge what AI is doing and how far it got, from request to deploy."
sourceDate: "2026-09-10T20:56:00"
---

When you vibe code with the help of an AI agent, you often run into unfamiliar words.

“I created a branch.”  
“I'll commit and push.”  
“The build passed, but the E2E test failed.”

You asked it to write code, yet it feels as if you have to learn another language just to understand the result.

You don't need to memorize every developer term. But if you know a few, it becomes easier to judge what the AI is doing, how far it has gotten, and what you should check at the next step.

I organized the terms that come up often, following the flow from the moment you hand a task to AI until the change reaches the live service.

## Words you use when explaining work to AI

| Term | Plain explanation | Example |
|---|---|---|
| **Prompt** | A request or instruction you give to AI. | “Build a sign-up screen, and if there's an input error, show a message explaining it.” |
| **Specification, Spec** | A concrete write-up of the features to build and the conditions they must meet. | “Email is required. If the address is already registered, show a duplicate notice.” |
| **Context** | The information AI refers to when deciding how to do the work. It includes the conversation, code, documents, tool outputs, and so on. | Have it read the existing design and login method first. |
| **Token** | The unit AI uses to process text and code. It doesn't map exactly to the number of characters or words. | If you pass along long documents and a lot of code, the number of tokens processed goes up too. |
| **[Context Window](https://platform.claude.com/docs/en/build-with-claude/context-windows)** | The limit on how much information AI can handle in a single pass. | On long tasks, summarize the key decisions and the current status separately and pass them along. |
| **[Agent](https://www.anthropic.com/engineering/building-effective-agents)** | An AI system that decides its next action based on a goal and moves the work forward using tools. | It reads and edits files, looks at the test results, and fixes things again. |

In particular, it helps to understand context as separate from permanent memory. As a conversation gets long, depending on the tool, earlier content may be summarized or partly left out. When you hand ongoing work back to AI, it's useful to give a short summary of the current goal, the conditions already decided, and the problems that remain.
## Words that describe the structure of the service you're building

For example, think of a feature where an application form appears, the user fills it in, and the submitted information is saved. The screen and the saving process are connected, but they play different roles.

| Term | Plain explanation | Example |
|---|---|---|
| **Frontend** | Handles the screens users see and the interactions that happen on them. | Builds buttons, input fields, menus, and error messages. |
| **[Backend](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction)** | Handles data processing, service rules, and the like on the server side. | Checks and saves submitted content, or verifies access permissions. |
| **[API](https://developer.mozilla.org/en-US/docs/Glossary/API)** | The point of contact through which one program uses another program's functions or data in a defined way. | The screen sends the application details to the server. |
| **Database, DB** | A system for storing and retrieving data in an organized way. | Stores members, products, and application records. |
| **Schema** | A structure that defines the fields, formats, relationships, and so on of data. | Deciding that each application record will have an application number, a date, and a processing status. |
| **Component** | A reusable part that makes up a screen or feature. | Using the same Apply button on several pages. |
| **Library** | A ready-made collection of code you can pull in for the features you need. | Pulling in features for date calculations or chart display. |
| **[Framework](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_tools/Overview)** | A foundation that provides the basic structure and way of working for building an application. | Writing pages and server features to fit a set structure. |
| **Dependency** | Other code or tools a project needs in order to run or to be developed. | Needing a specific version of a library you use. |

Once you know this distinction, you can make sense of an explanation like “The screen is built, but the save API isn't connected yet.” It means checking separately whether the screen shows up and whether the information is actually saved.
## Words for recording and combining changes

| Term | Plain explanation |
|---|---|
| **[Git](https://git-scm.com/docs/gittutorial)** | A tool that records and manages the history of changes to code. |
| **[GitHub](https://docs.github.com/en/get-started/start-your-journey/what-is-github)** | A service that stores Git repositories online and supports reviewing changes and collaborating. |
| **Repository, Repo** | The space where a project's files and change history are managed. |
| **Branch** | A line of work that splits off from the existing history and carries changes forward separately. |
| **[Worktree](https://git-scm.com/docs/git-worktree)** | A Git feature that lets you work on different branches of the same repository in separate folders. |
| **Diff** | The difference that shows what was added, changed, or deleted between before and after a change. |
| **Commit** | Recording selected changes as a single point in Git history. It's separate from saving a file. |
| **Push** | Sending commits and the like from your local repository to a remote repository. |
| **Pull** | Bringing in changes from a remote repository and integrating them into your current branch. |
| **[Pull Request, PR](https://docs.github.com/en/pull-requests/reference/pull-requests)** | A request to review your changes and merge them in. |
| **Merge** | Combining separate lines of development history. |
| **Conflict** | A state where changes can't be combined automatically, so you have to decide which content to keep. |

The thing to remember here is that **saving a file → commit → push → PR → merge** are each different actions. Opening a PR doesn't mean the merge is done, and committing doesn't mean the change is on the remote repository.
When you hand work to several AIs at once, you may come across the word worktree. It helps you run each task in its own folder, but you still need to combine and review the changes later.
## Where, and with what settings, the code runs

| Term | Plain explanation | Good to know |
|---|---|---|
| **IDE** | An integrated development environment that helps you edit code, run it, check for errors, and more. | Think of it as the workshop where development work happens. |
| **Terminal / CLI** | A terminal is a window where you type commands as text, and a CLI is a way of operating programs through commands. | These come up often when AI runs install, run, or check commands. |
| **[Local / localhost](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/set_up_a_local_testing_server)** | Local is the environment of the computer you're working on right now. localhost refers to the very computer making the connection. | If you send someone the localhost address from your computer, it won't take them to the same screen. |
| **Development** | The environment where you build, modify, and check features. | A development environment can also be connected to external data or services. |
| **Staging** | An environment set up for a final check before changes go to production. | This is a different meaning from ‘staging’ in Git, where you select the changes to commit. |
| **[Production](https://vercel.com/docs/deployments/environments)** | The live environment that real users use. | Changes here can affect real users. |
| **[Environment Variable](https://12factor.net/config)** | A setting value passed to a program from the environment it runs in. | Used to set things like server addresses or feature settings differently for each environment. |
| **API Key** | A value that, depending on the service, identifies who is making a call or authenticates access to an API. | Secret keys must not be included in public code or in code that is sent to the browser. |

“It worked fine locally” tells you the scope of the environment that was checked. Whether it also works in the live service has to be checked, including the production settings and connection status. And putting a secret in an environment variable doesn't make it safe on its own.
## Words for finding problems and checking that things work

| Term | Plain explanation | Example |
|---|---|---|
| **Bug** | A defect that keeps a program from working as intended. | Pressing the submit button twice saves the application twice. |
| **Debugging** | The process of reproducing a problem, finding the cause, and fixing it. | Checking whether the duplicate save comes from the screen or from server processing. |
| **Log** | The record of execution a program leaves behind. | Looking at when a request came in and where it failed. |
| **[Unit Test](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Testing)** | Tests small units of functionality on their own. | Checking that the discount amount is calculated correctly. |
| **Integration Test** | Tests how things behave when several parts are connected. | Checking that application processing and data saving work together. |
| **[E2E Test · End-to-End Test](https://playwright.dev/docs/writing-tests)** | Tests the flow a user goes through, from start to finish. | Logging in, submitting an application, and reaching the completion screen. |
| **[Lint](https://eslint.org/docs/latest/use/core-concepts/)** | Checks code, before it runs, for violations of set rules, suspicious patterns, and the like. | Finding unused variables or error-prone expressions. |
| **[Type Check](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)** | Checks that kinds of data and the way they're used match. | Checking whether a string was passed where a number is needed. |
| **Regression Test** | Checks that existing features didn't break after a change. | After changing sign-up, checking the existing login again too. |
| **Refactoring** | Improving the internal structure of code while keeping its externally observable behavior the same. | Gathering repeated code into one place so it's easier to modify. |

When you get a report that says “tests passed,” it's worth also looking at **what was tested, and under what conditions**. A check of a calculation feature and a check that completes an application in a real browser cover different ground. If the tests used fake responses, they may not have verified the connection to the real external service.
Lint and type checks are useful too, but they don't guarantee that the feature the user wants is finished. You can build a program that follows the code rules and still displays application results incorrectly.
## Words you use when shipping finished code to the service

| Term | Plain explanation | Good to know |
|---|---|---|
| **Build** | The process of preparing source code in a form that can be run or deployed. | A successful build and a feature that actually works are two separate things to check. |
| **Deploy** | Putting the prepared program into the environment where it will run. | You can deploy to a test environment, or to the real production environment. |
| **Hosting** | Providing the operating environment so a website or service can run and be accessed. | The repository that stores code and the environment where the service runs play different roles. |
| **[CI · Continuous Integration](https://docs.github.com/en/actions/get-started/understand-github-actions)** | A development practice of integrating code changes often while automatically running checks such as builds and tests. | Set it up so automatic checks run when changes are shared. |
| **[CD · Continuous Delivery / Deployment](https://vercel.com/docs/git)** | Means either keeping changes in a deployable state, or automatically deploying changes that pass the checks. | Check which meaning of CD is in use, and whether it is automatic all the way to actual deployment. |
| **Rollback** | Going back to a previous version or state when a problem occurs. | Rolling back the code version doesn't automatically restore data that has already changed. |

Some projects are set up so that a push or merge triggers an automatic deploy. So when you hear an explanation like “I'll push,” it's good to know whether a deploy is tied to that step.
## MCP

As you connect AI tools, you'll also run into the term “[MCP](https://modelcontextprotocol.io/docs/getting-started/intro).” MCP is an open standard that AI applications use to connect to external data and tools. Depending on the features and permissions of the connected tool, an AI application can read information or carry out tasks.
## Your questions change

Once you know a few terms, the sentences you use to make requests to AI become more specific too.

Instead of “Is it done?” you can ask like this.

> “Tell me how far you've gotten, step by step: code changes, tests, commit, push, and deploy. Also explain which features you actually checked and which parts you haven't been able to check yet.”

Before changes are made, you can confirm the scope of the work.

> “First explain which screens and features this request will change. Also lay out the impact on existing features and how to check whether the work is done.”

When reviewing the results, you can focus on understanding what changed.

> “Based on the diff, explain in plain words what you changed and why. Also tell me how to revert it if something goes wrong.”

The most practical moment to learn developer terms is when you ask questions like these. You become able to read the current status from AI's explanation of its work and judge what to do next.
