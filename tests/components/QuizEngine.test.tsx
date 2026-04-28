import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import QuizEngine from '../../src/features/curriculum/QuizEngine';
import { Question } from '../../src/types';

const questions: Question[] = [
  {
    id: 'q1',
    text: 'What determines a Wi-Fi client data rate?',
    options: ['SSID name', 'SNR', 'AP color', 'Cable length'],
    correctIndex: 1,
    explanation: 'SNR drives the MCS rate that determines usable throughput.',
  },
];

const baseProps = {
  questions,
  currentQuestionIndex: 0,
  selectedOption: null,
  isAnswered: false,
  score: 0,
  showSummary: false,
  xpReward: 100,
  onOptionSelect: vi.fn(),
  onSubmitAnswer: vi.fn(),
  onNextQuestion: vi.fn(),
  onFinalCompletion: vi.fn(),
};

describe('QuizEngine', () => {
  it('requires an option before submit and emits answer actions', async () => {
    const user = userEvent.setup();
    const onOptionSelect = vi.fn();
    const onSubmitAnswer = vi.fn();

    const { rerender } = render(
      <QuizEngine {...baseProps} onOptionSelect={onOptionSelect} onSubmitAnswer={onSubmitAnswer} />
    );

    expect(screen.getByRole('button', { name: /submit answer/i })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'SNR' }));
    expect(onOptionSelect).toHaveBeenCalledWith(1);

    rerender(
      <QuizEngine
        {...baseProps}
        selectedOption={1}
        onOptionSelect={onOptionSelect}
        onSubmitAnswer={onSubmitAnswer}
      />
    );

    await user.click(screen.getByRole('button', { name: /submit answer/i }));
    expect(onSubmitAnswer).toHaveBeenCalledTimes(1);
  });

  it('calls final completion with pass status from the summary screen', async () => {
    const user = userEvent.setup();
    const onFinalCompletion = vi.fn();

    render(
      <QuizEngine
        {...baseProps}
        score={1}
        showSummary
        onFinalCompletion={onFinalCompletion}
      />
    );

    await user.click(screen.getByRole('button', { name: /return to base/i }));
    expect(onFinalCompletion).toHaveBeenCalledWith(true);
  });
});
