import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import CourseMap from '../../src/features/curriculum/CourseMap';
import { INITIAL_LESSONS } from '../../src/content/lessons';

describe('CourseMap', () => {
  it('opens a module and selects an unlocked lesson', async () => {
    const user = userEvent.setup();
    const onSelectLesson = vi.fn();

    render(<CourseMap lessons={INITIAL_LESSONS} onSelectLesson={onSelectLesson} />);

    await user.click(screen.getByRole('button', { name: /module 1: the physics/i }));
    await user.click(screen.getByRole('button', { name: /1\.1 the decibel code/i }));

    expect(onSelectLesson).toHaveBeenCalledWith(expect.objectContaining({ id: '1.1' }));
  });
});
