const formatTalkers = (talkers) => {
  const newTalkers = talkers.map((talker) => {
    const { id, name, age, talk_watched_at: watchedAt, talk_rate: rate } = talker;
    return {
      id,
      name,
      age,
      talk: { watchedAt, rate },
    };
  });
  return newTalkers;
};

module.exports = formatTalkers;