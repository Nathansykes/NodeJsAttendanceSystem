# **Assessment Brief**

| Module Leader: Soumya Basu | Level:6 |
| --- | --- |
| Module Name:Software Architecture and Design | Module Code:55-608213 |
| Assignment Title: Portfolio of Software Development Artefacts |
| Individual / GroupGroup | Weighting: 100% | Magnitude: _wordcount/length of…_ |
| Submission date/time:01/12/2022 | Blackboard submission YTurnitin submission N | Format: Software Design artefacts, source code, word/pdf document. |
| Planned feedback date:22/12/2022 | Mode of feedback:Verbal and written | In-module retrieval available: No |


**Module Learning Outcomes**


- LO1: Select and apply contemporary design techniques, architectures and frameworks in the implementation of software applications.
- LO2: Implement software using a variety of frameworks.
- LO3: Examine comparatively systems architectures and demonstrate appropriate uses for them.
- LO4: Use appropriate design strategies effectively to guide the production of solutions in a complex problemdomain.

# Introduction

In this assessment you will design and build a Web application that makes use of modern application development frameworks and development techniques. You will demonstrate your understanding of the design techniques, architectures and technical opportunities provided by such frameworks.

You will be working on teams of 3 to 5. Details about confirming your team composition will be circulated separately on the Blackboard site and during classes.

This application should be built to meet the needs of the clients in the case study presented in a separate document. The case study has been selected as it offers several challenges with regards to design, usability, security, and privacy. Your design should reflect these issues; we expect designs and implementations that deal with each of these key challenges. This assessment will require a coordinated approach and as such, we expect you to plan your time appropriately using an appropriate project management model.

Your design should consider the case study holistically. For implementation, you can select two or three major functionalities within your group. The selected functionalities should include at least two types of users.

The assessment is divided into three main groups:

* Group #1 is the production of your solution's overall architecture and design upon which an implementation will be based.

* Group #2 is the implementation of your solution using the technology and frameworks discussed throughout the module.

* Group #3 is the production of a group project report and an individual reflection reports. Group project report is used for the assessment walkthrough.

You and your team will work together following the roadmap presented in this document. It includes a general guidance on the expected progress of your project as well as opportunities for formative feedback throughout the semester.

Your mark is composed by a group-based assessment, an individual reflection statement and a peer-assessment element. For the group assessment each member of your group will get the same marks. If you wish you may want to submit a peer review form in case, you feel some member's contribution is not up to the mark. Based on tutor observation and peer review group assessment marks may be reduced for a member.

This document details each of the elements mentioned above.


# Design artefacts

Using the case study materials provided, you need to arrive at the requirements and create the overall solution and designs upon which an implementation will be based.

The requirements should include possible scenarios for different types of users. It should also include a formal requirement documentation (user story or use case or requirement specification) adhering to the SMART(T) criteria.

The solution should include system context (to show the system boundary and its interaction with external entities) and architecture overview (including the major subsystems of the system and how they communicate with each other).

The designs should include static and dynamic models.

Design artefacts should include

- User scenarios for different types of users and SMART(T) requirements linked with the scenarios. Requirements can be documented using user story or use cases or requirement specifications. Requirements should also consider both functional and non-functional requirements.
- A System Context diagram indicating the boundary of this solution and possible interaction with external entities.
- An architecture overview demonstrating the solution architecture.
- A static model (e.g., a class diagram, component relationship diagram, entity relationship diagram or other structural diagram) that shows the major units in your system and the relationships between them.
- A dynamic model (e.g., Interaction diagrams like sequence or collaboration, activity diagrams, state chart or other behavioural diagrams) that explains the interactions between units in your system to handle the core areas of functionality. This must include a dynamic model of a specific complex piece of functionality, e.g., how the system collects data from different sources at different rates.
- A textual description/annotation (as appropriate) about the primary responsibilities of different units in the system and the interaction between the units. Descriptions/annotations can relate to any of the above models.

The models may be submitted using a suitable modelling environment available on a standard university desktop (e.g., StarUML, Visual Paradigm or diagrams.net) or as good quality image files (i.e., ones that you can easily read all details) - Suggestion, use vectorial images when exporting from the chosen tool.

You must also upload all designs to the module Blackboard site by the deadline. Design artefacts should be part of the group project report and should be submitted in a doc (word or pdf) format or combined in a single zip file.

# Development

Your team must build a prototype of a system that demonstrates your design. You are required to implement your designs for the case study and test your implementation. In your group you can select two or three major functionalities encompassing at least two types of users for the prototype development.

We recommend that your team adopts a feature-driven development approach, tackling one problem at a time and updating the initial design documents to reflect any changes identified during the implementation.

You must prioritise what functionalities will be explored by the team from the features described below.

We require that your group use JavaScript to demonstrate the following aspects of the application:

* An application that runs on the node.js server.
* A data access layer that wraps a suitable database, presenting records and tuples as JavaScript objects in the form of JSON documents. This must implement a full set of CRUD operations.
* A back-end layer that accepts HTTP REST requests (at least GET and POST), validates those requests and routes them to the appropriate URL endpoints.
* A front-end layer that implements views using a framework such as Vue, React or Angular.

Some specific aspects about your development approach are discussed in the sequence.

You are required to implement the system following the designs you created. You should only deviate from the designs if you can present a very good, critical reason for making the change. You will need to explain and justify any changes you make from the designs in your group project report.

While several designs for the case study may include mobile capabilities, you may choose to develop your applications for a desktop using a suitably restricted window size to simulate a mobile screen if you find this more convenient. You can mock some services if needed. You can also have prepopulated data, if required to implement any functionality.

We are looking for quality software engineering (good coding practice, testing, project management or any other applicable practices) over quantity. Please check with the module team to clarify the scope of your implementation.

While the primary focus of the implementation aspects is the end-product and the evaluation, we will be looking for quality within your engineering practice such as code commenting, documentation, careful testing, version control, static code review, containerised deployment etc.

In addition to implementing the design and producing a working system for the case study, you need to formally test it, and during the walkthrough you will be asked to demonstrate and discuss the testing that you have done. Your test cases should align with those described in your formal requirements specification.

# Documentation and Reports

As part of the assessment your group will submit a single report with the documentation of your project and each person will submit an individual reflection report.

## 4.1. Group Project Report

Your team will need to produce a report on your design and development approach. It should include the produced artefacts and important design/development decisions with justification, mainly when there are deviations from design in your implementation. This report is used for your assignment walkthrough.

## 4.2. Individual Reflection Report

As an individual you need to produce a reflection report. It should include the role you played, how you have worked within a group and your lessons learnt. You should include what you would have done differently as an individual given a chance to execute it again. The reflection should be up to 2 sides of A4 remember, quality over quantity is being assessed.


# Submission and Deliverables

The deadline for this task is **3 pm on Thursday 01**** st **** December 2022**. There will be a group submission point and an individual submission point to segregate group submission and individual submission. One of the group members can submit in the group submission point and the same will be reflected for all members.

ATTENTION TO THE FOLLOWING POINTS:

You **must** submit the following to the group submission point in Blackboard.

  - Do not include the contents of the node modules folder.
- You **must** include a readme file with
  - a link to your repository and video.
  - instructions for building and running your application.
  - Your readme must be plain text or simply formatted using markdown1.
- You **must** include instructions or a script for rebuilding and repopulating the database.
- Include any unit, integration or UI tests that you developed together with your test results.
- You must prepare a running version of your solution in a University PC or in the Azure Labs VM allocated for you in this module.
- Group project report including design artifacts
  - Scenarios and requirements
  - System Context and Architecture Overview
  - Static and Dynamic Model
  - Important design decisions with justification
  - Any design changes that you may have done during development in your group with justification.

You **must** submit the following to the individual submission point in Blackboard:

- Individual reflection

All the implementation and documentation created for the project must be uploaded as a single ZIP file to the module Blackboard site by the specified deadline. This deadline is shortly before the walkthroughs but must contain all materials you wish to present.

# Roadmap/Milestones

The following table outlines a suggestion of weekly milestones that need to be adhered to in order to complete the assignment on time.

| **Date** | **Milestone** |
| --- | --- |
| Week 1 (30th September 2022) | Groups are formed. Clarification obtained about the case study. |
| Week 2 (7th October 2022) | Requirements specification (User scenarios and SMART(T) requirements |
| Week 3 (14th October 2022) | Overall solution architecture (System Context and Architecture Overview)
| Week 4 (21st October 2022) | Static models |
| Week 5 (28th October 2022) | Dynamic models |
| Week 6 (4th November 2022) | Implementation plan and implementation platform readiness |
| Week 7 (11th November 2022) | Implementation checkpoint 1 with emphasise on security aspects |
| Week 8 (18th November 2022) | Implementation checkpoint 2 with emphasise on testing |
| Week 9 (25th November 2022) | Implementation checkpoint 3 with emphasise on software engineering practices
| Week 10 (1st December 2022) | Final Submission |