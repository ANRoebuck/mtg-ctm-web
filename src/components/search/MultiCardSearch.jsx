import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { searchCards } from '../../gateway/http';
import { pricesStore } from '../../store/PricesStore';
import './multi-card-search.scss';

const MAX_CARDS = 10;

const parseLines = (text) =>
    text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

const MultiCardSearch = ({ snapToResults, disabled = false }) => {
    const [open, setOpen]         = useState(false);
    const [cardList, setCardList] = useState('');
    const [resolving, setResolving] = useState(false);

    const lines = parseLines(cardList);
    const overLimit = lines.length > MAX_CARDS;

    const handleSearch = async () => {
        const terms = lines.slice(0, MAX_CARDS);
        setResolving(true);

        const resolved = await Promise.all(
            terms.map(term =>
                searchCards(term)
                    .then(cards => cards?.[0]?.name ?? null)
                    .catch(() => null)
            )
        );

        const cards = resolved.filter(Boolean);
        setResolving(false);
        setOpen(false);
        setCardList('');
        pricesStore.searchForMultiplePrices(cards);
        snapToResults();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) handleSearch();
    };

    return (
        <>
            <button className="multi-card-search__trigger" onClick={() => setOpen(true)} disabled={disabled}>
                multi-search
            </button>

            <Dialog open={open} onClose={() => !resolving && setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Search multiple cards</DialogTitle>
                <DialogContent>
                    <textarea
                        className="multi-card-search__input"
                        placeholder={'Multi-search is a new feature still under development.\n\nPaste up to 10 card names, one per line:\n\nLightning Bolt\nCounterspell\nSwords to Plowshares'}
                        value={cardList}
                        onChange={e => setCardList(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={10}
                        autoFocus
                        disabled={resolving}
                    />
                    <p className={`multi-card-search__count${overLimit ? ' multi-card-search__count--over' : ''}`}>
                        {lines.length} / {MAX_CARDS}
                        {overLimit && ` — only the first ${MAX_CARDS} will be searched`}
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} disabled={resolving}>Cancel</Button>
                    <Button
                        onClick={handleSearch}
                        color="primary"
                        variant="contained"
                        disabled={resolving || lines.length === 0}
                    >
                        {resolving ? <CircularProgress size={20} color="inherit" /> : 'Search'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default MultiCardSearch;
