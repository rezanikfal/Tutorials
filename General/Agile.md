# Agile Mindset
- It might be more efficient to have generalists instead of specialists.
- It also might make sense to focus on short-term planning.
### Managing people in a factory VS in a software project
- You can't direct a team of people who collectively know more about the product than anyone else in management.
- So you have managers becoming less directive and more supportive. 
- One of the key things that you see with agile teams is this push to be self organized
- You focus on having collective decision making.
### Traditional Planning
1. Plan the project
2. Execute the project
3. Test the project
### Agile Mindset
 - Balance between making decisions and having enough flexibility to make changes
 - Most software products have to deal with something called the cone of uncertainty.
 ![cone of uncertainty](./Pics/Cone.png)
### Agile Manifesto
<img src="../Pics/AgileManifesto.png" width="700">

### Agile Principles  
- __P2:__ Welcoming ***Changes*** when you're working in your cone of uncertainty.   
- __P3, P7:__ Continuous software delivery in weeks as a measure of progress (***Sprints***).  
- __P4:__ Business people and developers must work together daily throughout the project (***Product Owner***).  
- __P11, P5:__ Most agile teams are cross functional and self organized (Small teams of ***Generalists***).  
- __P6:__ Importance of face to face conversations (***User Stories***).  
- __P1, P8, P9, P10:__ The product owner will identify what the customer ***Values the Most*** to be delivered in a short sprint.  
- __P12:__ Encourages the team to meet frequently to discuss process improvement (***Stand-ups***).

### Avoid Multitasking  
Instead of working on several different things at once, the entire team will focus on a limited set of high value tasks

### Avoid Hand-offs (Penny game)
- If you can keep your batches of work sizes smaller, it will make it easier to limit your handoffs.
- Penny game shows that while individual productivity decreases, the overall productivity of the whole team will increase.
- The most productive way is by moving around small batches work and eliminating handoffs even if your own productivity decreases.

### Deliver at a Predictable Pace 
 Short-term predictable delivery over long-term plans with an uncertain outcome.

### User Story
- Product owners should creat the best possible user stories.
- General Sample: As a user, I want some feature so that I can get some value.
- As a restaurant owner, I want to be able to put my menu online so that people will be interested in my restaurant.
- The restaurant owner doesn't talk about upload buttons or databases, they just care about the __value__.
- Make sure they take the time to write __clear__ stories with a __simple__ value statement.

### Requirements VS user stories
Requirements are designed to limit the conversation. A good requirements document will be very clear and tell the developer exactly what to do. User stories are a note to have a future conversation. It isn't designed to show the answers, instead it helps the team ask the right questions.

### Sample user stories:
- As a restaurant owner, I want to be able to print out, email and text my reservation list so that we know how many people to expect.
  - It has a long list of value statements, so it's really three stories in one. (Difficult to estimate and deliver).
- As a customer, I want an email copy of my receipt so that I can have it on my phone.
  - This story doesn't have a clear value statement. (Why the customer might value a copy on their phone).
  - Maybe they're keeping track of their expenses. The team would want to know this value so they can better deliver the product.
- As a developer, I want to design the database tables so that the restaurant owner can add reservation information. 
  - This user story probably came from a requirements document.
  - It talks about technical requirements and is not written from the perspective of the customer.

### Pareto Principle (80/20 Rule)
Software features that are used by customers:  
<img src="../Pics/rule8020.png" width="550">
- This 20% is the most valuable part of the software (__Often__ and __Always__ used)
- Agile team should start the most valuable 20% first.
- This would be part of the highest priority featured delivered in the very first sprint.

### Avoid PowerPoint
- We need to deliver small, fully-functional features of the product to the customer in iterations or sprints
- Agile team doesn't think about software as a __project__, instead it thinks of it as a __product__ that has prioritized value that you deliver

###  Embracing Change / Inspect and adapt
- Agile teams welcome changing requirements even late in development (Principle 2).
- Two of the most popular software development methods are __scrum__ and __extreme programming__.
 
### Stay within timeboxes (2 weeks sprint)
 -  Agile teams focus on being predictable instead of creating detailed plans (delivering predictably every few weeks).
 -  We can't have meetings that go over schedule or brainstorming sessions. That's because your team has a deadline every few weeks (sprints).
 - If your meeting is scheduled for 45 minutes then the meeting will end in 45 minutes. Whatever your team decides within that timebox.
 
### Waterfall VS Agile
- Waterfall example:
   - Business analysts will work on analyzing the requirements.
   - The software architects will design the system.
   - Software developers will then code the software.
   - Separate quality assurance team will run all the tests.
   - Also a separate infrastructure team that's responsible for deployment.
- Agile:
   - Instead of having business analysts, testers, and developers, you'll have generalized team members that try to do a little bit of everything.
   - The product owner on the team will give you all the user stories you need to keep working.
   
### Commit to sprints
- The term Sprint is from __Scrum__ which is the most popular Agile framework (It is two week time box).
- Scrum Events:
   - On the very first day of your Sprint, you'll have a Sprint planning meeting. This shouldn't be more than a two hour meeting.
   - Every morning the Scrum team should stand up for it's daily Scrum. It is between developers about the progress (~ 15 min).
   - At the end of the Sprint, the team will have a Sprint Review. The customer can offer any feedback (~ 2 hours).
   - The last hour and a half of the Sprint is dedicated to a team retrospective (What went well in the Sprint & What could be improved).
- Even though you're doing a lot of the same work as a waterfall project, you're __not__ delivering the work in __phases__.
   
### Iterative delivery
- It's very common for agile teams to deliver incrementally in a two-week sprint.
- But these teams also work in sprints to deliver the product iteratively (Refinement).  

Most teams instinctively break up large products into phases (Building car in __phases__):  
<img src="../Pics/WF.png" width="550">  
Agile (Building a smaller increment of the car's __value__):  
<img src="../Pics/Ag.png" width="550">  

### SCRUM (The most popular Agile framework)
- Agile is a mindset, while Scrum is a way to help you embrace that mindset. 
- Scrum is to Agile in the same way that something like aerobics is to fitness.
- Scrum teams inspect and adapt. Scrum is very lightweight. A Scrum team only has three roles, and should only have five events.

### Extreme programming (XP)
- XP is still only focused on software development. Some form of XP's agile planning:
  - __User stories__ are a short description of a feature that's written in the language of the customer (__NOT__ Technical).
  - In the past, software development teams might work on some code and then try to integrate it all at the end. XP teams __continuously integrate__ their code (Constant Refactoring).
  - __Test-driven__ development, or __TDD__, and it helps developers understand how the software will work
  
### Kanban
- Kanban is a scheduling system that use to apply __lean thinking__ to software development.
  - respect for people.
  - continuously improve.
-  Kanban board (or task board in Scrum)
<img src="../Pics/kanbanBoard.PNG" width="550">  
During the morning stand-up meeting, you assign yourself the work. Remember that lean encourages your team to be self-organized
  
### Agile Roles
- Scrum Master is NOT Project Manager
  - People in the organization will __Project Managers__ to them for status updates, and they're responsible for hiring and firing people on their team.
  - A scrum master acts as a coach. Instead of having authority over the team, he'll be encouraging them to take on greater responsibilities.
  - Scrum master is contacting someone, setting up meetings, ordering software or showing the product owner how to write better user stories.
- Product Owner is NOT Business Analyst
  - A business analyst will typically create project requirements, then hands it off to the team and team tekes care of the rest of story.
  - That might make you uncomfortable because in the past there were very clear lines of responsibility. But an agile team mixes up these lines.
  - The product owner sits and even works with the team to deliver the product. They don't just hand off requirements, instead they own the product.
  
### Avoid normal group-think
- Face-to-face communication and cross-functional self-organized teams are actually closely related.
- A few experts make a convincing argument and the rest of the team just follow along (group-think is WRONG)
- The face-to-face meetings where everyone's contributing their ideas and asking challenging questions.(AGILE)

### Report VS Software / Organizational Change
- An agile team doesn't communicate with reports, instead the team communicates with working software.
- One of the most common types of Organizational Culture is the __Control Culture__. This is a culture that's based on a hierarchy of different positions.
- This common type of organization will have a really hard time embracing some of the radical changes that are part of an agile.
