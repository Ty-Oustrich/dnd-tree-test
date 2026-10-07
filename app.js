(function () {
  "use strict";

  const app = document.getElementById("app");
  const TYPES = window.TYPE_OPTIONS;
  const SIZES = window.SIZE_OPTIONS;
  const SPECIES = window.SPECIES;
  const TASKS = window.TASKS;

  const CSV_COLUMNS = [
    "session_id",
    "participant_name",
    "event_index",
    "row_type",
    "event_type",
    "timestamp_iso",
    "session_elapsed_ms",
    "task_position",
    "task_id",
    "task_prompt",
    "target_species",
    "task_elapsed_ms",
    "mode",
    "screen",
    "type_filter",
    "size_filter",
    "action_label",
    "from_state",
    "to_state",
    "selected_species",
    "is_correct",
    "outcome",
    "navigation_click_count",
    "backward_count"
  ];

  const state = {
    screen: "home",
    mode: null,
    pendingName: "",
    participantName: "",
    sessionId: "",
    sessionStartedAt: 0,
    taskStartedAt: 0,
    taskOrder: [],
    taskIndex: 0,
    completedTaskIds: [],
    events: [],
    eventIndex: 0,
    navigationClicks: 0,
    backwardCount: 0,
    typeFilter: "",
    sizeFilter: "",
    filterOrder: [],
    selectedSpecies: "",
    historyReady: false
  };

  let timerHandle = null;

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function slugify(value) {
    return String(value)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "participant";
  }

  function makeSessionId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function shuffled(items) {
    const copy = items.slice();
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
    }
    return copy;
  }

  function currentTask() {
    return state.taskOrder[state.taskIndex] || null;
  }

  function snapshot() {
    return {
      screen: state.screen,
      mode: state.mode,
      typeFilter: state.typeFilter,
      sizeFilter: state.sizeFilter,
      filterOrder: state.filterOrder.slice(),
      selectedSpecies: state.selectedSpecies,
      taskIndex: state.taskIndex
    };
  }

  function restoreSnapshot(saved) {
    if (!saved) return;
    state.screen = saved.screen;
    state.mode = saved.mode;
    state.typeFilter = saved.typeFilter || "";
    state.sizeFilter = saved.sizeFilter || "";
    state.filterOrder = Array.isArray(saved.filterOrder) ? saved.filterOrder.slice() : [];
    state.selectedSpecies = saved.selectedSpecies || "";
    if (Number.isInteger(saved.taskIndex)) state.taskIndex = saved.taskIndex;
  }

  function writeHistory(replace) {
    const label = state.screen === "browse" ? state.mode || "browse" : state.screen;
    const url = `${window.location.pathname}${window.location.search}#${label}`;
    const data = { wireframe: true, snapshot: snapshot() };
    if (replace) {
      window.history.replaceState(data, "", url);
    } else {
      window.history.pushState(data, "", url);
    }
    state.historyReady = true;
  }

  function elapsedSince(start) {
    return start ? Math.max(0, Date.now() - start) : 0;
  }

  function logEvent(eventType, details) {
    if (state.mode !== "test" || !state.sessionId) return;
    const options = details || {};
    const task = currentTask();
    if (options.navigationClick) state.navigationClicks += 1;
    if (options.backward) state.backwardCount += 1;
    state.eventIndex += 1;
    state.events.push({
      session_id: state.sessionId,
      participant_name: state.participantName,
      event_index: state.eventIndex,
      row_type: options.rowType || "event",
      event_type: eventType,
      timestamp_iso: new Date().toISOString(),
      session_elapsed_ms: elapsedSince(state.sessionStartedAt),
      task_position: task ? state.taskIndex + 1 : "",
      task_id: task ? task.id : "",
      task_prompt: task ? task.prompt : "",
      target_species: task ? task.target : "",
      task_elapsed_ms: task && state.taskStartedAt ? elapsedSince(state.taskStartedAt) : "",
      mode: "test",
      screen: state.screen,
      type_filter: state.typeFilter,
      size_filter: state.sizeFilter,
      action_label: options.actionLabel || "",
      from_state: options.fromState || "",
      to_state: options.toState || "",
      selected_species: Object.hasOwn(options, "selectedSpecies") ? options.selectedSpecies : state.selectedSpecies,
      is_correct: Object.hasOwn(options, "isCorrect") ? options.isCorrect : "",
      outcome: options.outcome || "",
      navigation_click_count: state.navigationClicks,
      backward_count: state.backwardCount
    });
  }

  function resetFilters() {
    state.typeFilter = "";
    state.sizeFilter = "";
    state.filterOrder = [];
    state.selectedSpecies = "";
  }

  function clearSession() {
    state.mode = null;
    state.pendingName = "";
    state.participantName = "";
    state.sessionId = "";
    state.sessionStartedAt = 0;
    state.taskStartedAt = 0;
    state.taskOrder = [];
    state.taskIndex = 0;
    state.completedTaskIds = [];
    state.events = [];
    state.eventIndex = 0;
    state.navigationClicks = 0;
    state.backwardCount = 0;
    resetFilters();
  }

  function navigate(screen, replace) {
    state.screen = screen;
    writeHistory(Boolean(replace));
    render();
  }

  function startSession() {
    state.mode = "test";
    state.participantName = state.pendingName.trim();
    state.sessionId = makeSessionId();
    state.sessionStartedAt = Date.now();
    state.taskOrder = shuffled(TASKS);
    state.taskIndex = 0;
    state.completedTaskIds = [];
    state.events = [];
    state.eventIndex = 0;
    logEvent("session_start", { actionLabel: "Begin test" });
    beginTask(true);
  }

  function beginTask(replaceHistory) {
    resetFilters();
    state.screen = "browse";
    state.navigationClicks = 0;
    state.backwardCount = 0;
    state.taskStartedAt = Date.now();
    const task = currentTask();
    logEvent("task_start", {
      actionLabel: task ? task.prompt : "",
      fromState: "between_tasks",
      toState: "task_root"
    });
    writeHistory(Boolean(replaceHistory));
    render();
  }

  function finishTask(outcome) {
    const task = currentTask();
    const selected = outcome === "submitted" ? state.selectedSpecies : "";
    const correct = selected ? selected === task.target : false;
    logEvent(outcome === "submitted" ? "task_submit" : "task_give_up", {
      rowType: "task_result",
      actionLabel: outcome === "submitted" ? "Submit selection" : "Give up",
      fromState: state.selectedSpecies ? `leaf:${state.selectedSpecies}` : "browse",
      toState: "between_tasks",
      selectedSpecies: selected,
      isCorrect: correct,
      outcome,
      navigationClick: outcome === "submitted"
    });
    state.completedTaskIds.push(task.id);
    state.taskStartedAt = 0;
    state.screen = "transition";
    state.selectedSpecies = "";
    writeHistory(false);
    render();
  }

  function continueAfterTask() {
    if (state.taskIndex < state.taskOrder.length - 1) {
      state.taskIndex += 1;
      beginTask(false);
      return;
    }
    state.screen = "complete";
    resetFilters();
    logEvent("session_complete", {
      actionLabel: "All tasks completed",
      fromState: "between_tasks",
      toState: "complete"
    });
    writeHistory(false);
    render();
  }

  function csvCell(value) {
    const normalized = value === null || value === undefined ? "" : String(value);
    return `"${normalized.replaceAll('"', '""')}"`;
  }

  function createCsv() {
    const lines = [CSV_COLUMNS.map(csvCell).join(",")];
    state.events.forEach((event) => {
      lines.push(CSV_COLUMNS.map((column) => csvCell(event[column])).join(","));
    });
    return `${lines.join("\r\n")}\r\n`;
  }

  function downloadCsv() {
    logEvent("export_csv", {
      actionLabel: "Download CSV",
      fromState: state.screen,
      toState: state.screen
    });
    const blob = new Blob([createCsv()], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    const stamp = new Date().toISOString().replaceAll(":", "-").replace(".000", "");
    anchor.href = url;
    anchor.download = `${slugify(state.participantName)}-tree-test-${stamp}.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  function progressHtml() {
    return `<div class="progress" aria-label="Task ${state.taskIndex + 1} of ${state.taskOrder.length}">${state.taskOrder.map((_, index) => {
      let className = "";
      if (index < state.taskIndex) className = "complete";
      if (index === state.taskIndex && state.screen !== "complete") className = "current";
      return `<span class="${className}" aria-hidden="true"></span>`;
    }).join("")}</div>`;
  }

  function homeHtml() {
    return `
      <section class="narrow stack" aria-labelledby="home-title">
        <div class="panel">
          <h1 id="home-title">D&amp;D species navigation study</h1>
          <p>Complete ten short finding tasks or explore the structure without recording data.</p>
          <div class="notice">
            <p><strong>Draft task wording:</strong> the test engine is complete, but the ten prompts are temporary placeholders.</p>
          </div>
        </div>
        <div class="actions vertical" aria-label="Choose a mode">
          <button type="button" data-action="open-name">Start tree test</button>
          <button type="button" data-action="start-free">Free roam</button>
          <button type="button" data-action="open-notes">Wireframe notes</button>
        </div>
      </section>`;
  }

  function nameHtml() {
    return `
      <section class="narrow stack" aria-labelledby="name-title">
        <div class="panel">
          <h1 id="name-title">Enter participant name</h1>
          <p>Your name and test activity will stay in this browser until you download the CSV. Nothing is sent to a server.</p>
          <form id="name-form" class="stack" novalidate>
            <div class="field">
              <label for="participant-name">Participant name</label>
              <input id="participant-name" name="participantName" type="text" autocomplete="name" required maxlength="100" value="${escapeHtml(state.pendingName)}">
            </div>
            <p id="name-error" class="error" hidden>Please enter a participant name.</p>
            <div class="actions">
              <button type="submit">Continue</button>
              <button type="button" data-action="home">Cancel</button>
            </div>
          </form>
        </div>
      </section>`;
  }

  function instructionsHtml() {
    return `
      <section class="narrow stack" aria-labelledby="instructions-title">
        <div class="panel">
          <h1 id="instructions-title">How the test works</h1>
          <ul class="checklist">
            <li>You will complete the same ten tasks as every other participant, in a random order.</li>
            <li>Use species type and relative size to find one destination for each task.</li>
            <li>You may use breadcrumbs to move backward.</li>
            <li>Submit one selection per task. The test will not tell you whether it was correct.</li>
            <li>Your clicks, backward moves, selection, and time are recorded in a downloadable CSV.</li>
          </ul>
        </div>
        <div class="actions">
          <button type="button" data-action="begin-test">Begin test</button>
          <button type="button" data-action="open-name">Change name</button>
        </div>
      </section>`;
  }

  function toolbarHtml() {
    if (state.mode !== "test") {
      return `
        <div class="mode-banner">
          <span>Free-roam mode — activity is not recorded</span>
          <button type="button" data-action="home">Exit free roam</button>
        </div>`;
    }
    return `
      <div class="test-toolbar">
        <div>
          <div>${escapeHtml(state.participantName)}</div>
          <div>Task ${state.taskIndex + 1} of ${state.taskOrder.length} · <span id="task-time">0:00</span></div>
        </div>
        ${progressHtml()}
        <div class="actions">
          <button type="button" data-action="export">Download CSV</button>
          <button type="button" data-action="give-up">Give up task</button>
        </div>
      </div>`;
  }

  function taskHtml() {
    if (state.mode !== "test") return "";
    const task = currentTask();
    return `
      <section class="task-card" aria-labelledby="task-heading">
        <div class="task-meta">
          <span>Current task</span>
          <span>${escapeHtml(task.id)}</span>
        </div>
        <hr class="muted-rule">
        <h1 id="task-heading">${escapeHtml(task.prompt)}</h1>
      </section>`;
  }

  function navHtml() {
    return `
      <nav class="global-nav" aria-label="Species type">
        <h2>1. Choose a species type</h2>
        <ul class="nav-list">
          ${TYPES.map((type) => `
            <li><button class="nav-button" type="button" data-action="type" data-value="${escapeHtml(type)}" aria-pressed="${state.typeFilter === type}">${escapeHtml(type)}</button></li>`).join("")}
        </ul>
      </nav>`;
  }

  function sizeHtml() {
    return `
      <aside class="size-sidebar" aria-labelledby="size-title">
        <h2 id="size-title">2. Choose a relative size</h2>
        <ul class="size-list">
          ${SIZES.map((size) => `
            <li><button class="size-button" type="button" data-action="size" data-value="${escapeHtml(size)}" aria-pressed="${state.sizeFilter === size}">${escapeHtml(size)}</button></li>`).join("")}
        </ul>
      </aside>`;
  }

  function breadcrumbTrail() {
    const baseLabel = state.mode === "test" ? `Task ${state.taskIndex + 1}` : "Free roam";
    const trail = [{ label: baseLabel, key: "base" }];
    state.filterOrder.forEach((key) => {
      trail.push({ label: key === "type" ? state.typeFilter : state.sizeFilter, key });
    });
    if (state.selectedSpecies) trail.push({ label: state.selectedSpecies, key: "leaf" });
    return trail;
  }

  function breadcrumbsHtml() {
    const trail = breadcrumbTrail();
    return `
      <nav class="breadcrumb-wrap" aria-label="Breadcrumb">
        <ol class="breadcrumbs">
          ${trail.map((item, index) => {
            const last = index === trail.length - 1;
            const label = escapeHtml(item.label);
            const content = last
              ? `<span aria-current="page">${label}</span>`
              : `<button class="crumb-button" type="button" data-action="crumb" data-index="${index}">${label}</button>`;
            const separator = last ? "" : `<span class="crumb-separator" aria-hidden="true">/</span>`;
            return `<li>${content}${separator}</li>`;
          }).join("")}
        </ol>
      </nav>`;
  }

  function resultsHtml() {
    if (state.selectedSpecies) {
      return `
        <section class="terminal-card" aria-labelledby="selection-title">
          <h2 id="selection-title">You selected</h2>
          <div class="terminal-choice">${escapeHtml(state.selectedSpecies)}</div>
          ${state.mode === "test"
            ? `<button type="button" data-action="submit-selection">Submit selection</button>`
            : `<p>This is the terminal information block for ${escapeHtml(state.selectedSpecies)}.</p>`}
        </section>`;
    }

    if (!state.typeFilter && !state.sizeFilter) {
      return `
        <section class="notice" aria-labelledby="results-title">
          <h2 id="results-title">Choose a route</h2>
          <p>Begin with a species type above or a relative size at left. Species appear after both facets are selected.</p>
        </section>`;
    }

    if (!state.typeFilter || !state.sizeFilter) {
      const next = state.typeFilter ? "relative size" : "species type";
      return `
        <section class="notice" aria-labelledby="results-title">
          <h2 id="results-title">One more choice</h2>
          <p>You selected ${escapeHtml(state.typeFilter || state.sizeFilter)}. Now choose a ${next}.</p>
        </section>`;
    }

    const matches = SPECIES.filter((item) => item.types.includes(state.typeFilter) && item.size === state.sizeFilter);
    return `
      <section aria-labelledby="results-title">
        <h2 id="results-title">${escapeHtml(state.sizeFilter)} ${escapeHtml(state.typeFilter)}</h2>
        <p>${matches.length} information block${matches.length === 1 ? "" : "s"}</p>
        ${matches.length
          ? `<ul class="species-grid">${matches.map((item) => `<li><button class="species-button" type="button" data-action="leaf" data-value="${escapeHtml(item.name)}">${escapeHtml(item.name)}</button></li>`).join("")}</ul>`
          : `<div class="notice"><p>No information blocks are assigned to this combination. Use the breadcrumbs to try another path.</p></div>`}
      </section>`;
  }

  function browseHtml() {
    return `
      ${toolbarHtml()}
      ${taskHtml()}
      ${navHtml()}
      ${breadcrumbsHtml()}
      <div class="browse-layout">
        ${sizeHtml()}
        <div class="results-region">${resultsHtml()}</div>
      </div>`;
  }

  function transitionHtml() {
    return `
      <section class="narrow stack" aria-labelledby="recorded-title">
        <div class="test-toolbar">
          <div>${escapeHtml(state.participantName)}</div>
          ${progressHtml()}
          <button type="button" data-action="export">Download CSV</button>
        </div>
        <div class="panel">
          <h1 id="recorded-title">Selection recorded</h1>
          <p>No correctness feedback is shown during the test.</p>
          <button type="button" data-action="next-task">${state.taskIndex < state.taskOrder.length - 1 ? "Continue to next task" : "Finish test"}</button>
        </div>
      </section>`;
  }

  function completeHtml() {
    return `
      <section class="narrow stack" aria-labelledby="complete-title">
        <div class="panel">
          <h1 id="complete-title">Test complete</h1>
          <p>All ten selections have been recorded. Download the CSV and give it to the study facilitator.</p>
          <div class="actions">
            <button type="button" data-action="export">Download CSV</button>
            <button type="button" data-action="new-test">Start another participant</button>
          </div>
        </div>
      </section>`;
  }

  function notesHtml() {
    const cardSortCount = SPECIES.filter((item) => item.source === "card-sort").length;
    const extensionCount = SPECIES.length - cardSortCount;
    return `
      <section class="stack" aria-labelledby="notes-title">
        <div class="notes-section">
          <h1 id="notes-title">Wireframe notes</h1>
          <p>This page is for the project team and instructor. It is outside the participant test flow.</p>
          <button type="button" data-action="home">Return home</button>
        </div>

        <section class="notes-section" aria-labelledby="evidence-title">
          <h2 id="evidence-title">Card-sort evidence</h2>
          <p>The study reported four working labels: Humanoids (6 of 8 sorts), Beasts or Animals (6 of 8), Goblinoids (3 of 8), and Magical (5 of 8). Cross-listing is allowed because several species moved between participant groups.</p>
          <p>Relative Size is the second finding route. Small, Medium, and Large describe perceived build for this prototype, not the rules-defined D&amp;D creature-size statistic.</p>
          <p>${cardSortCount} exact names came from the card-sort set. ${extensionCount} additional names were supplied for prototype coverage and placed by analogy; the team should review those placements.</p>
        </section>

        <section class="notes-section" aria-labelledby="rubric-title">
          <h2 id="rubric-title">Rubric coverage</h2>
          <ul class="checklist">
            <li>True wireframe fidelity: black and white, one font, generic boxes, no imagery.</li>
            <li>All ${SPECIES.length} information blocks are generated from one data source.</li>
            <li>Two routes: species type in global navigation and relative size in the sidebar.</li>
            <li>Two hierarchy levels are required before terminal species blocks appear.</li>
            <li>Every leaf has an unambiguous “You selected X” terminal state.</li>
            <li>Test mode records clicks, breadcrumbs, browser Back actions, results, and timing in one CSV.</li>
            <li>Free-roam mode provides unrecorded coverage inspection.</li>
          </ul>
        </section>

        <section class="notes-section" aria-labelledby="coverage-title">
          <h2 id="coverage-title">Information-block coverage (${SPECIES.length})</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th scope="col">Information block</th><th scope="col">Type placement</th><th scope="col">Relative size</th><th scope="col">Basis</th></tr></thead>
              <tbody>
                ${SPECIES.map((item) => `<tr><td>${escapeHtml(item.name)}</td><td>${escapeHtml(item.types.join(", "))}</td><td>${escapeHtml(item.size)}</td><td>${item.source === "card-sort" ? "Card-sort set" : "Prototype extension"}</td></tr>`).join("")}
              </tbody>
            </table>
          </div>
        </section>
      </section>`;
  }

  function render() {
    if (timerHandle) {
      window.clearInterval(timerHandle);
      timerHandle = null;
    }

    const views = {
      home: homeHtml,
      name: nameHtml,
      instructions: instructionsHtml,
      browse: browseHtml,
      transition: transitionHtml,
      complete: completeHtml,
      notes: notesHtml
    };
    const view = views[state.screen] || homeHtml;
    app.innerHTML = view();
    app.focus({ preventScroll: true });

    if (state.screen === "browse" && state.mode === "test" && state.taskStartedAt) {
      const updateTimer = () => {
        const timer = document.getElementById("task-time");
        if (!timer) return;
        const seconds = Math.floor(elapsedSince(state.taskStartedAt) / 1000);
        timer.textContent = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
      };
      updateTimer();
      timerHandle = window.setInterval(updateTimer, 1000);
    }
  }

  function chooseFacet(key, value) {
    const property = key === "type" ? "typeFilter" : "sizeFilter";
    const previous = state[property];
    state[property] = value;
    state.selectedSpecies = "";
    if (!state.filterOrder.includes(key)) state.filterOrder.push(key);
    logEvent(`${key}_${previous ? "change" : "select"}`, {
      actionLabel: value,
      fromState: previous || "unselected",
      toState: value,
      navigationClick: true
    });
    writeHistory(false);
    render();
  }

  function useBreadcrumb(index) {
    const from = breadcrumbTrail().map((item) => item.label).join(" > ");
    const keep = state.filterOrder.slice(0, index);
    if (!keep.includes("type")) state.typeFilter = "";
    if (!keep.includes("size")) state.sizeFilter = "";
    state.filterOrder = keep;
    state.selectedSpecies = "";
    const to = breadcrumbTrail().map((item) => item.label).join(" > ");
    logEvent("breadcrumb_back", {
      actionLabel: to,
      fromState: from,
      toState: to,
      navigationClick: true,
      backward: true
    });
    writeHistory(false);
    render();
  }

  function openLeaf(name) {
    const from = breadcrumbTrail().map((item) => item.label).join(" > ");
    state.selectedSpecies = name;
    logEvent("leaf_open", {
      actionLabel: name,
      fromState: from,
      toState: `${from} > ${name}`,
      selectedSpecies: name,
      navigationClick: true
    });
    writeHistory(false);
    render();
  }

  function goHome() {
    if (state.mode === "test" && state.sessionId && state.screen !== "complete") {
      const leave = window.confirm("Leave this test? The unfinished session will be cleared and cannot be resumed.");
      if (!leave) return;
    }
    clearSession();
    state.screen = "home";
    writeHistory(false);
    render();
  }

  app.addEventListener("submit", (event) => {
    if (event.target.id !== "name-form") return;
    event.preventDefault();
    const field = document.getElementById("participant-name");
    const error = document.getElementById("name-error");
    state.pendingName = field.value;
    if (!state.pendingName.trim()) {
      error.hidden = false;
      field.focus();
      return;
    }
    state.screen = "instructions";
    writeHistory(false);
    render();
  });

  document.addEventListener("click", (event) => {
    const control = event.target.closest("[data-action]");
    if (!control) return;
    if (control.tagName === "A") event.preventDefault();
    const action = control.dataset.action;

    if (action === "home") goHome();
    if (action === "open-name") navigate("name", false);
    if (action === "start-free") {
      clearSession();
      state.mode = "free";
      state.screen = "browse";
      writeHistory(false);
      render();
    }
    if (action === "open-notes") navigate("notes", false);
    if (action === "begin-test") startSession();
    if (action === "type") chooseFacet("type", control.dataset.value);
    if (action === "size") chooseFacet("size", control.dataset.value);
    if (action === "crumb") useBreadcrumb(Number(control.dataset.index));
    if (action === "leaf") openLeaf(control.dataset.value);
    if (action === "submit-selection") finishTask("submitted");
    if (action === "give-up") finishTask("gave_up");
    if (action === "next-task") continueAfterTask();
    if (action === "export") downloadCsv();
    if (action === "new-test") {
      clearSession();
      state.screen = "name";
      writeHistory(false);
      render();
    }
  });

  window.addEventListener("popstate", (event) => {
    if (!event.state || !event.state.wireframe) {
      goHome();
      return;
    }
    const previous = snapshot();
    const incoming = event.state.snapshot;
    const activeTask = currentTask();
    const crossesTaskBoundary = state.mode === "test"
      && state.sessionId
      && (!incoming || incoming.taskIndex !== state.taskIndex);
    const reopensCompletedTask = state.mode === "test"
      && state.sessionId
      && activeTask
      && state.completedTaskIds.includes(activeTask.id)
      && incoming
      && incoming.screen === "browse";

    if (crossesTaskBoundary || reopensCompletedTask) {
      restoreSnapshot(previous);
      writeHistory(true);
      render();
      return;
    }

    const before = breadcrumbTrail().map((item) => item.label).join(" > ");
    restoreSnapshot(incoming);
    const after = breadcrumbTrail().map((item) => item.label).join(" > ");
    if (state.mode === "test" && state.sessionId && state.screen === "browse") {
      logEvent("browser_back", {
        actionLabel: "Browser Back",
        fromState: before,
        toState: after,
        navigationClick: true,
        backward: true
      });
    }
    render();
  });

  window.addEventListener("beforeunload", (event) => {
    if (state.mode === "test" && state.sessionId && state.screen !== "complete") {
      event.preventDefault();
      event.returnValue = "";
    }
  });

  writeHistory(true);
  render();
})();
