import { describe, it, expect, jest } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TeamCard from '@/features/battle/components/TeamCard';

const mockTeam = {
  id: 'team_123',
  name: 'Dream Team',
  pokemons: [
    {
      id: 1,
      name: 'Pikachu',
    },
    {
      id: 2,
      name: 'Charizard',
    },
  ],
};

const renderTeamCard = (props = {}) => {
  const defaultProps = {
    team: mockTeam,
    isSelected: false,
    onSelect: jest.fn(),
    onDelete: jest.fn(),
    onEdit: jest.fn(),
    disabled: false,
  };

  return render(
    <BrowserRouter>
      <TeamCard {...defaultProps} {...props} />
    </BrowserRouter>
  );
};

describe('TeamCard Component', () => {
  it('should render team name and pokemon count', () => {
    renderTeamCard();
    
    expect(screen.getByText('Dream Team')).toBeInTheDocument();
    expect(screen.getByText('2 Pokémon')).toBeInTheDocument();
  });

  it('should call onSelect when clicked', () => {
    const onSelect = jest.fn();
    renderTeamCard({ onSelect });
    
    const button = screen.getByText("Dream Team");
    fireEvent.click(button);
    
    expect(onSelect).toHaveBeenCalledWith('team_123');
  });

  it('should call onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    renderTeamCard({ onEdit });
    
    const editButton = screen.getByTitle('Edit team');
    
    fireEvent.click(editButton);
    expect(onEdit).toHaveBeenCalledWith('team_123');
  });

  it('should call onDelete when delete button is clicked', () => {
    const onDelete = jest.fn();
    renderTeamCard({ onDelete });
    
    const deleteButton = screen.getByTitle('Delete team');
    
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalled();
  });
});
