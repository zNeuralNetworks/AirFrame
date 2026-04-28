import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import SearchBar from '../../src/shared/ui/layout/SearchBar';

describe('SearchBar', () => {
  it('filters search data and calls the selected result handler', async () => {
    const user = userEvent.setup();
    const onSearchResultClick = vi.fn();

    render(
      <SearchBar
        searchData={[
          {
            id: '1.1',
            title: 'The Decibel Code',
            category: 'Lesson',
            content: 'RSSI and dBm fundamentals for wireless engineers.',
          },
          {
            id: '2.1',
            title: 'Airtime Economics',
            category: 'Lesson',
            content: 'Contention, half-duplex behavior, and airtime cost.',
          },
        ]}
        onSearchResultClick={onSearchResultClick}
      />
    );

    await user.type(screen.getByPlaceholderText(/search/i), 'rssi');
    await user.click(screen.getByRole('button', { name: /the decibel code/i }));

    expect(onSearchResultClick).toHaveBeenCalledWith('1.1');
  });
});
