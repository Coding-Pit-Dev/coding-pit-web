# Design Document

## Overview

Este diseño describe la implementación para convertir la aplicación web a un modo exclusivamente oscuro, eliminando el componente de cambio de tema y mejorando la visibilidad del logo. La solución se enfoca en simplificar el sistema de temas manteniendo únicamente las variables CSS del modo oscuro y añadiendo un fondo al logo para mejorar su contraste.

## Architecture

### Current System Analysis

La aplicación actualmente utiliza:
- **CSS `light-dark()` function**: Para alternar automáticamente entre colores claros y oscuros
- **`DarkMode` component**: De `accessible-astro-components` para el toggle de tema
- **`.darkmode` class**: Aplicada al `<html>` para forzar el modo oscuro
- **`color-scheme` property**: Para indicar al navegador el esquema de colores preferido

### Proposed Architecture

1. **Forced Dark Mode**: Aplicar permanentemente la clase `.darkmode` al elemento `<html>`
2. **Simplified CSS Variables**: Reemplazar las funciones `light-dark()` con valores fijos del modo oscuro
3. **Logo Enhancement**: Añadir un fondo sutil al logo para mejorar su visibilidad
4. **Component Removal**: Eliminar el componente `DarkMode` de la navegación

## Components and Interfaces

### 1. Theme System Modification

**File**: `src/assets/scss/base/_root.scss`

- Reemplazar todas las funciones `light-dark()` con los valores del modo oscuro
- Mantener el `color-scheme: dark` permanentemente
- Simplificar las variables CSS eliminando la lógica de alternancia

**Before**:
```scss
--foreground-color: light-dark(var(--color-neutral-800), var(--color-neutral-100));
```

**After**:
```scss
--foreground-color: var(--color-neutral-100);
```

### 2. Logo Component Enhancement

**File**: `src/components/Logo.astro`

- Añadir un fondo sutil con border-radius al contenedor del logo
- Usar colores que contrasten bien con el tema oscuro
- Mantener la accesibilidad y responsive design

**Design Approach**:
```scss
.logo-container {
  background-color: var(--color-neutral-800);
  border-radius: var(--radius-s);
  padding: var(--space-2xs);
  border: 1px solid var(--color-neutral-700);
}
```

### 3. Navigation Component Cleanup

**File**: `src/components/Header.astro`

- Remover la importación del componente `DarkMode`
- Eliminar el `<li>` que contiene el toggle de tema
- Limpiar los estilos relacionados con `.type-icon`

### 4. Global Dark Mode Application

**Implementation Strategy**:
- Aplicar la clase `.darkmode` directamente en el layout base
- Asegurar que se aplique en todas las páginas sin excepción
- Remover cualquier lógica JavaScript relacionada con el cambio de tema

## Data Models

No se requieren cambios en los modelos de datos, ya que esta es una modificación puramente visual y de interfaz.

## Error Handling

### Potential Issues and Solutions

1. **Logo Visibility**: Si el fondo no proporciona suficiente contraste
   - **Solution**: Usar un color de fondo más contrastante o añadir una sombra sutil

2. **CSS Variables Undefined**: Si alguna variable CSS no está definida correctamente
   - **Solution**: Definir fallbacks para todas las variables críticas

3. **Component Dependencies**: Si otros componentes dependen del `DarkMode`
   - **Solution**: Revisar y actualizar todas las referencias

## Testing Strategy

### Manual Testing

1. **Visual Regression Testing**:
   - Verificar que todas las páginas se muestren correctamente en modo oscuro
   - Confirmar que el logo sea claramente visible en todas las páginas
   - Probar en diferentes dispositivos y tamaños de pantalla

2. **Navigation Testing**:
   - Verificar que la navegación funcione correctamente sin el toggle de tema
   - Confirmar que no hay elementos rotos o mal posicionados

3. **Accessibility Testing**:
   - Verificar que el contraste del logo cumple con WCAG guidelines
   - Confirmar que la navegación por teclado funciona correctamente

### Automated Testing

1. **CSS Validation**:
   - Verificar que no hay variables CSS no definidas
   - Confirmar que todos los estilos se compilan correctamente

2. **Component Testing**:
   - Verificar que el componente Logo se renderiza correctamente
   - Confirmar que la navegación no tiene errores JavaScript

### Browser Compatibility

- Probar en navegadores modernos que soporten `color-scheme`
- Verificar que los fallbacks funcionen en navegadores más antiguos
- Confirmar que el diseño sea responsive en todos los dispositivos

## Implementation Notes

### CSS Custom Properties Strategy

En lugar de usar `light-dark()`, definiremos directamente los valores del modo oscuro:

```scss
:root {
  color-scheme: dark;
  
  // Direct dark mode values
  --foreground-color: var(--color-neutral-100);
  --background-color: var(--color-neutral-900);
  --icon-color: var(--color-neutral-100);
  // ... etc
}
```

### Logo Background Design

El fondo del logo debe ser sutil pero efectivo:
- Color de fondo ligeramente más claro que el fondo principal
- Border radius pequeño para mantener la estética moderna
- Padding mínimo para no alterar significativamente el tamaño
- Border sutil para definir mejor los límites

### Performance Considerations

- Eliminar el JavaScript del toggle de tema reducirá ligeramente el bundle size
- Simplificar las variables CSS puede mejorar marginalmente el rendimiento de renderizado
- El logo con fondo no debería impactar significativamente el rendimiento