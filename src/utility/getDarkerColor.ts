export function getDarkerColor(color: string, coeff: number): string {
    console.log(color);

    // Убедимся, что входной цвет имеет правильный формат
    if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
        throw new Error('Неверный формат цвета. Используйте формат #ffffff.');
    }

    // Извлечем значения красного, зеленого и синего цветов из строки
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    // Уменьшим значения цветов на коэффициент, ограничивая результат от 0 до 255
    const darkenedR = Math.max(0, Math.min(Math.round(r * coeff), 255));
    const darkenedG = Math.max(0, Math.min(Math.round(g * coeff), 255));
    const darkenedB = Math.max(0, Math.min(Math.round(b * coeff), 255));

    // Преобразуем значения обратно в строку и вернем результат
    return `#${darkenedR.toString(16).padStart(2, '0')}${darkenedG
        .toString(16)
        .padStart(2, '0')}${darkenedB.toString(16).padStart(2, '0')}`;
}
