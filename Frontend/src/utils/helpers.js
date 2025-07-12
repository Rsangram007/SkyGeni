export const getUniqueQuarters = (data) => {
    return [...new Set(data.map(item => item.closed_fiscal_quarter))]
      .sort((a, b) => {
        const [yearA, quarterA] = a.split('-');
        const [yearB, quarterB] = b.split('-');
        if (yearA !== yearB) return yearA - yearB;
        return quarterA.localeCompare(quarterB);
      });
  };

