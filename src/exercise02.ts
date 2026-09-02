
export function transcribeDNA(dna: string): string {
  
  let rna = '';
  for (let i = 0; i < dna.length; i++) {
    const char = dna[i];

    if (char === 'A') {
      rna += 'U';
    } else if (char === 'T') {
      rna += 'A';
    } else if (char === 'C') {
      rna += 'G';
    } else if (char === 'G') {
      rna += 'C';
    } else {
      throw new Error('Please enter a valid DNA nucleotide.');
    }
  }

  return rna;
}

