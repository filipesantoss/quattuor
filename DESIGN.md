### Project Overview:

* **Game Name**: quattuor
* **Genre**: Puzzle, Strategy
* **Platform**: Web
* **Target Audience**: Casual players of games like *Onitama*, *Go*, and *Chess*.

---

### 1. Project Phases Overview:

* **Phase 1**: Concept and Pre-production
* **Phase 2**: Core Game Development
* **Phase 3**: Polish, Testing, and Optimization

---

### Phase 1: Concept

#### Goals:

* Define gameplay mechanics and rules in detail.
* Establish core technology stack and tools.

#### Deliverables:

* [ ] **Technical Specification**: Outline architecture and technologies.
* [ ] **Game Prototyping**: Build a low-fidelity prototype to test basic game mechanics.

---

### Phase 2: Core Game Development (Alpha)

#### Goals:

* Develop the core mechanics of movement, card drawing, and turn order.
* Implement dynamic level generation and solvability features.
* Build initial AI to control element movements for testing.

#### Deliverables:

* **Functional Requirements**:

  1. **Grid and Board Setup**:
     * [x] 9x9 grid.
     * [x] 4 elements.
     * [x] Define how "marked" fields work and how elements interact with them.

  2. **Element Movement**:
     * [x] Implement movement logic for each of the 16 beast cards.
     * [x] Implement turn-based system with defined turn order.

  3. **Card System**:
     * [x] Assign movement cards to elements.
     * [x] Ensure element movement respects the card order per element.

  4. **Shrine System**:
     * [x] Assign a unique target point for each element.
     * [x] Implement logic for reaching the target field.

  5. **Winning and Progression**:
     * [x] Implement a win condition when all elements reach their shrine.
     * [ ] Design a "new" option.
     * [ ] Design an "undo" option.

  6. **Auto-Generation Algorithm**:
     * [ ] Develop a system that ensures all generated levels are solvable with a unique solution.
     * [ ] Implement procedural generation of levels, where the game randomly places elements and shrines and draws cards.

* **Non-Functional Requirements**:

   1. **Performance**: Efficient algorithm for level generation and AI processing, ensuring minimal lag even on lower-end devices.

   2. **Cross-platform Development**: Make sure that the game runs smoothly on both mobile and desktop.

---

### Phase 3: Polish, Testing, and Optimization (Beta)

#### Goals:

* Refine user interface, graphics, and animations.
* Implement sound effects and background music.
* Conduct extensive testing.

#### Deliverables:

* **Functional Requirements**:

  1. **Game Interface**:

     * [ ] Visuals for the cards.
     * [ ] Visuals for the turn order.
     * [ ] Visuals for the grid, elements, and movement transitions.
     * [ ] Include tutorials or tooltips for explaining mechanics.

  2. **Animation**:

     * [ ] Smooth element movement animations based on selected movement cards.
     * [ ] Visual effects when an element marks a field or gains a new turn.

  3. **Audio Design**:

     * [ ] Background music that complements the pace of the puzzle-solving.
     * [ ] Sound effects for movement, card draws, winning, etc.

  4. **AI Testing**:

     * [ ] Test auto-generation algorithm for both solvability and randomness.
     * [ ] AI should behave predictably and correctly, avoiding deadlocks.

  5. **Accessibility**:

     * [ ] Add features for colorblind modes or other accessibility options.

* **Non-Functional Requirements**:

  1. **Security**: Implement secure data storage.

  2. **Compatibility**: Ensure the game is compatible with a range of devices and screen sizes.
