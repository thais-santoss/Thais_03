/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Carrega o conteúdo HTML
const html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');


describe('Teste da lista de tarefas', () => {
  let addTaskBtn;
  let taskInput;
  let taskList;

  beforeEach(() => {
    // Define o documento com o conteúdo HTML
    document.documentElement.innerHTML = html.toString();

    // Simula o evento DOMContentLoaded
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);

    // Carrega o script JS
    require('../public/app.js');


    // Pega os elementos DOM
    addTaskBtn = document.getElementById('add-task-btn');
    taskInput = document.getElementById('task-input');
    taskList = document.getElementById('task-list');
  });

  test('Deve adicionar uma tarefa à lista', () => {
    taskInput.value = 'Estudar Jest';
    addTaskBtn.click();

    expect(taskList.children.length).toBe(1);
    expect(taskList.children[0].textContent).toContain('Estudar Jest');
  });

  test('Deve remover uma tarefa da lista', () => {
    taskInput.value = 'Estudar Jest';
    addTaskBtn.click();

    const deleteBtn = taskList.querySelector('.delete-btn');
    deleteBtn.click();

    expect(taskList.children.length).toBe(0);
  });

  test('Não deve adicionar tarefa vazia', () => {
    taskInput.value = '';
    addTaskBtn.click();

    expect(taskList.children.length).toBe(0);
  });

  test('Deve adicionar três tarefas e verificar se todas são realizadas', () => {
    const tarefas = ['Tarefa 1', 'Tarefa 2', 'Tarefa 3'];

    tarefas.forEach(tarefa => {
      taskInput.value = tarefa;
      addTaskBtn.click();
    });

    expect(taskList.children.length).toBe(3);
    expect(taskList.children[0].textContent).toContain('Tarefa 1');
    expect(taskList.children[1].textContent).toContain('Tarefa 2');
    expect(taskList.children[2].textContent).toContain('Tarefa 3');
  });
});


