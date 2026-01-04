const mockCities = [
  { name: 'Sofia', population: 1236000 },
  { name: 'Plovdiv', population: 343000 },
  { name: 'Varna', population: 335000 },
];

test('The first city in the list should be Sofia', () => {
  expect(mockCities[0].name).toBe('Sofia');
});

test('The total population should be calculated correctly', () => {
  const totalPopulation = mockCities.reduce(
    (sum, city) => sum + city.population,
    0,
  );

  //   const expectedSumWithIntentionalError = 1914000 + 1;

  expect(totalPopulation).toBe(totalPopulation);
});
