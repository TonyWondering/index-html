(() => {
  'use strict';
  const prompt = '使用“科研方向探索与论文证据分析”技能，我是一名刚入学的研究生，想了解无人机路径规划方向，我该从哪几篇论文看起？';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const presentation = document.querySelector('#presentation');
  const startButton = document.querySelector('#start-demo');
  const typed = document.querySelector('#typed-text');
  const accessible = document.querySelector('#accessible-status');
  const nodes = [...document.querySelectorAll('[data-step]')];
  const boundaries = [0, 1500, 3200, 4700, 9000, 10600, 12000];
  const stages = [
    ['选题范围', '从模糊兴趣到明确的入门范围', '聚焦单机四旋翼的运动规划，先建立框架，再进入算法与系统。', ['研究生入门', '单机运动规划', '阅读路线']],
    ['文献发现', '把五篇论文放进一条阅读路线', '复用已经产出的案例资料，区分通用综述、采样理论与四旋翼系统方法。', ['运动规划综述', 'RRT* / PRM*', 'RAPTOR / EGO-Planner']],
    ['证据核验', '让结论能回到原文', '五篇官方摘要与书目信息对应十九条声明；摘要证据不等于全文已核验。', ['16 条摘要证据', '3 条书目记录', '原始来源可回查']],
    ['集中诊断', '知识卡片，集中作答', '预设模拟作答展示', []],
    ['分析推荐', '从概览到基础，再进入系统', '示例画像提示：基础概念已具备，采样规划与轨迹优化仍需补充。按前置关系安排阅读。', ['模拟总分 62 / 100', '先读运动规划综述', '轨迹优化先补基础']],
    ['报告交付', '阅读理由与证据一起交付', '打开完整报告，查看知识画像、逐篇阅读建议与可旋转的研究图谱。', ['科研报告', '论文清单', '证据矩阵']]
  ];
  let started = false, currentStep = -1, selected = false, delivered = false, workflowStart = 0;

  function finishTyping() {
    typed.textContent = prompt;
    document.querySelector('#conversation-screen').classList.add('typing-complete');
    document.querySelector('#typing-status').textContent = '示例问题已准备好';
    document.querySelector('.window-status').textContent = '研究问题已就绪';
    startButton.disabled = false;
  }
  if (reduced) finishTyping();
  else {
    const chars = [...prompt];
    let index = 0;
    const type = () => {
      typed.textContent += chars[index++];
      if (index < chars.length) setTimeout(type, /[，？]/.test(chars[index - 1]) ? 180 : 44);
      else finishTyping();
    };
    setTimeout(type, 450);
  }

  function switchScreen(view) {
    const old = document.querySelector('.screen:not([hidden])');
    const next = document.querySelector(`#${view}-screen`);
    if (old === next) return;
    presentation.dataset.view = view;
    if (old) old.classList.add('leaving');
    setTimeout(() => {
      if (old) { old.hidden = true; old.classList.remove('leaving', 'entering'); }
      next.hidden = false;
      next.classList.add('entering');
    }, reduced ? 0 : 230);
  }
  function setStage(index) {
    currentStep = index;
    nodes.forEach((node, i) => {
      node.classList.toggle('is-done', i < index);
      node.classList.toggle('is-active', i === index);
      node.style.setProperty('--step-duration', `${boundaries[i + 1] - boundaries[i]}ms`);
      if (i === index) node.setAttribute('aria-current', 'step'); else node.removeAttribute('aria-current');
    });
    document.querySelector('#step-count').textContent = `${index + 1} / 6`;
    const info = stages[index];
    accessible.textContent = `演示工作流：${info[0]}`;
    const cards = document.querySelector('#diagnosis-demo');
    const overview = document.querySelector('#stage-overview');
    cards.hidden = index !== 3;
    overview.hidden = index === 3;
    if (index !== 3) {
      document.querySelector('#stage-category').textContent = info[0];
      document.querySelector('#stage-title').textContent = info[1];
      document.querySelector('#stage-description').textContent = info[2];
      document.querySelector('#stage-details').replaceChildren(...info[3].map(text => {
        const span = document.createElement('span'); span.textContent = text; return span;
      }));
      overview.style.animation = 'none';
      requestAnimationFrame(() => { overview.style.animation = ''; });
    }
  }
  function fillAnswers() {
    selected = true;
    document.querySelectorAll('.knowledge-card').forEach(card => {
      card.classList.add('answered');
      card.querySelector('.answer-state').textContent = `已选 ${card.dataset.card === '2' ? 'A' : 'B'} · 模拟作答`;
    });
    document.querySelector('#diagnosis-note').textContent = '三张示例已模拟作答。演示报告使用完整九题的预设答案，统一得分 62 / 100。';
  }
  function deliver() {
    delivered = true;
    nodes.forEach(node => { node.classList.remove('is-active'); node.classList.add('is-done'); });
    document.querySelector('#step-count').textContent = '6 / 6';
    switchScreen('delivery');
    accessible.textContent = '三个文件已准备好，三秒后打开科研报告。';
    const end = performance.now() + 3000;
    const redirect = () => {
      const remaining = Math.max(0, Math.ceil((end - performance.now()) / 1000));
      document.querySelector('#redirect-status').textContent = `${remaining} 秒后自动打开报告`;
      if (performance.now() >= end) location.assign('report.html');
      else requestAnimationFrame(redirect);
    };
    requestAnimationFrame(redirect);
  }
  function tick(now) {
    if (delivered) return;
    // A queued first animation frame may carry a timestamp from before the click.
    const elapsed = Math.max(0, now - workflowStart);
    if (elapsed >= 12000) { deliver(); return; }
    const index = boundaries.slice(0, -1).findLastIndex(time => elapsed >= time);
    if (index !== currentStep) setStage(index);
    if (elapsed >= 5750 && !selected) fillAnswers();
    requestAnimationFrame(tick);
  }
  startButton.addEventListener('click', () => {
    if (started || startButton.disabled) return;
    started = true;
    startButton.disabled = true;
    document.body.classList.add('workflow-running');
    switchScreen('workflow');
    workflowStart = performance.now();
    setStage(0);
    requestAnimationFrame(tick);
  });
})();
