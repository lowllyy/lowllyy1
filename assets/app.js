/* Lingo interactions: mobile navigation, demo forms and level quiz. */
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('[data-menu-toggle]');
  const navigation = document.querySelector('[data-main-nav]');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = navigation.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    });
  }

  document.querySelectorAll('[data-demo-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const notice = form.querySelector('[data-form-notice]');
      if (notice) {
        notice.textContent = 'Это демонстрационная форма. Данные не отправлены: подключите серверный сервис перед реальным использованием.';
        notice.classList.add('is-visible');
      }
    });
  });

  const quiz = document.querySelector('[data-level-quiz]');
  if (!quiz) return;

  const questions = [
    { question: 'Выберите правильный вариант: “She ___ from Madrid.”', options: ['are', 'is', 'be'], answer: 1 },
    { question: 'Как правильно сказать: “Я работаю здесь уже два года”?', options: ['I work here since two years.', 'I am working here two years ago.', 'I have worked here for two years.'], answer: 2 },
    { question: 'Выберите подходящее слово: “If I ___ more time, I would travel more.”', options: ['have', 'had', 'will have'], answer: 1 },
    { question: 'Что означает “to figure something out”?', options: ['Разобраться в чём-либо', 'Отложить встречу', 'Заполнить документ'], answer: 0 },
    { question: 'Выберите наиболее естественный вариант.', options: ['Despite of the rain, we went out.', 'Although the rain, we went out.', 'Despite the rain, we went out.'], answer: 2 },
    { question: 'Какой вариант лучше всего передаёт “Я бы предпочёл, чтобы вы сообщили заранее”?', options: ['I prefer you tell me before.', 'I would rather you let me know in advance.', 'I rather you will tell before.'], answer: 1 }
  ];
  let current = 0;
  let score = 0;
  const title = quiz.querySelector('[data-question]');
  const options = quiz.querySelector('[data-options]');
  const progress = quiz.querySelector('[data-progress]');
  const nextButton = quiz.querySelector('[data-next]');
  const result = quiz.querySelector('[data-result]');
  let selected = null;

  function renderQuestion() {
    const item = questions[current];
    selected = null;
    title.textContent = item.question;
    options.replaceChildren();
    item.options.forEach((label, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'quiz-option';
      button.textContent = label;
      button.addEventListener('click', () => {
        selected = index;
        options.querySelectorAll('button').forEach((option) => option.classList.remove('is-selected'));
        button.classList.add('is-selected');
      });
      options.append(button);
    });
    progress.style.width = `${(current / questions.length) * 100}%`;
    nextButton.textContent = current === questions.length - 1 ? 'Узнать результат' : 'Следующий вопрос';
  }

  nextButton.addEventListener('click', () => {
    if (selected === null) {
      result.textContent = 'Выберите один из вариантов, чтобы продолжить.';
      result.classList.add('is-visible');
      return;
    }
    if (selected === questions[current].answer) score += 1;
    current += 1;
    if (current < questions.length) {
      result.classList.remove('is-visible');
      renderQuestion();
      return;
    }
    const level = score <= 2 ? 'A1–A2 · Начальный уровень' : score <= 4 ? 'B1–B2 · Средний уровень' : 'B2–C1 · Продвинутый ориентир';
    title.textContent = 'Ваш предварительный результат';
    options.replaceChildren();
    progress.style.width = '100%';
    nextButton.hidden = true;
    result.textContent = `Правильных ответов: ${score} из ${questions.length}. Предварительный ориентир: ${level}. Короткий тест не оценивает аудирование и разговорную речь, поэтому используйте результат как подсказку, а не официальный уровень.`;
    result.classList.add('is-visible');
  });

  renderQuestion();
});
