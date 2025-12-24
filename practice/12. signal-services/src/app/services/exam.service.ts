import { computed, Injectable, signal } from '@angular/core';
import { Question } from '../models/question.model';
import { Answer } from '../models/answer.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
    // list of questions
    // list of user provided answers
    // isBusy

    readonly #questions = signal <Question[]>([
      {
        caption: "How much is 4 * 4",
        answers: [ '4', '8', '12', '16'],
        correctAnswerIndex: 3
      },
      {
        caption: "How much is 5 + 5",
        answers: [ '5', '10', '15', '20'],
        correctAnswerIndex: 1
      },
      {
        caption: "How much is 6 + 6",
        answers: [ '6', '12', '18', '24'],
        correctAnswerIndex: 1
      }
    ]);
  readonly questions = this.#questions.asReadonly;
  firstAns = this.#questions()[0].correctAnswerIndex;



  readonly #userAnswers = signal<number[]>([]);
  readonly userAnswers  = computed<Answer[]>(() => this.#userAnswers().map<Answer>((ans, index) => ({
    userAnswerIndex: ans,
    isCorrect: ans === (this.#questions()[index]?.correctAnswerIndex ?? null)
  })));
  
  readonly #isBusy= signal<boolean>(false);
  readonly isBusy = this.#isBusy.asReadonly;

  readonly currentQuestionIndex = computed(() => this.#userAnswers().length);
  readonly currentQuestion = computed (() => {
    console.log ('currentQuestionIndex', this.currentQuestionIndex());
    return this.#questions()[this.currentQuestionIndex()];
  }
  );

  readonly questionsCount = computed (() => this.#questions().length);
  readonly isQuizDone = computed(() => this.#userAnswers().length == this.questionsCount())

  readonly correctAnswers = computed(() => 
    this.userAnswers().filter(ans => ans.isCorrect)
  );

  readonly correctAnswerCount = computed(() => this.correctAnswers().length)


constructor() {
  console.log ('isQuizDone', this.isQuizDone());
  console.log ('currentQuestionIndex', this.currentQuestionIndex());
  console.log ('currentQuestion', this.currentQuestion());
  console.log ('questionsCount', this.questionsCount());
  console.log ('this.#userAnswers().length', this.#userAnswers().length);
  console.log ('questionsCount', this.questionsCount());
  
  
}
}
