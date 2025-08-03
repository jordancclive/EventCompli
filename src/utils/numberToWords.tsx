import React from 'react';
/**
 * Convert a number to its word representation
 * @param num - The number to convert
 * @returns The word representation of the number
 */
export function numberToWords(num: number): string {
  if (num === 0) return 'Zero';
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const scales = ['', 'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion'];
  function convertGroup(num: number): string {
    let result = '';
    if (num >= 100) {
      result += ones[Math.floor(num / 100)] + ' Hundred ';
      num %= 100;
    }
    if (num >= 20) {
      result += tens[Math.floor(num / 10)];
      if (num % 10 > 0) {
        result += '-' + ones[num % 10];
      }
    } else if (num > 0) {
      result += ones[num];
    }
    return result.trim();
  }
  if (num === 0) return 'Zero';
  let result = '';
  let scaleIndex = 0;
  while (num > 0) {
    const group = num % 1000;
    if (group > 0) {
      const groupText = convertGroup(group);
      if (groupText) {
        result = groupText + (scales[scaleIndex] ? ' ' + scales[scaleIndex] + ' ' : '') + result;
      }
    }
    scaleIndex++;
    num = Math.floor(num / 1000);
  }
  return result.trim();
}
/**
 * Format a number as currency in words
 * @param value - The numeric string to format
 * @returns The formatted currency string
 */
export function formatCurrencyInWords(value: string): string {
  if (!value || isNaN(Number(value))) return '';
  const num = parseInt(value, 10);
  if (num === 0) return '';
  return `${numberToWords(num)} Dollars`;
}