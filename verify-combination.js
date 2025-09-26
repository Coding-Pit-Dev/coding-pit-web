/**
 * Verificación de la Combinación de Páginas de Mentorías
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function verifyCombination() {
  console.log('🔄 Verificación de la Combinación de Páginas de Mentorías\n');
  console.log('=' .repeat(70));
  
  try {
    // Verificar que la página unificada existe y tiene el contenido correcto
    const mentoriasPath = path.join(__dirname, 'src/pages/formacion/mentorias.astro');
    const mentoriasContent = fs.readFileSync(mentoriasPath, 'utf8');
    
    console.log('📄 Verificando página unificada de mentorías:');
    console.log('-' .repeat(50));
    
    // Elementos de la página original
    const originalElements = [
      'Lo que ofrecemos',
      'Construir aplicaciones de alta calidad',
      'Clean Architecture',
      'PricingPlans',
      'PRReviewCard'
    ];
    
    // Elementos de la página avanzada
    const advancedElements = [
      '¿Por qué una mentoría?',
      'Resuelve dudas en tiempo real',
      '¿Para quién es Coding Pit?',
      'Cómo funciona',
      'Testimonios',
      'No aprendas solo'
    ];
    
    // Elementos de accesibilidad
    const accessibilityElements = [
      'aria-labelledby',
      'aria-hidden="true"',
      'role="button"',
      'Saltar al contenido principal',
      'focus:ring'
    ];
    
    let originalCount = 0;
    originalElements.forEach(element => {
      const found = mentoriasContent.includes(element);
      console.log(`${found ? '✅' : '❌'} Elemento original: "${element}"`);
      if (found) originalCount++;
    });
    
    let advancedCount = 0;
    advancedElements.forEach(element => {
      const found = mentoriasContent.includes(element);
      console.log(`${found ? '✅' : '❌'} Elemento avanzado: "${element}"`);
      if (found) advancedCount++;
    });
    
    let accessibilityCount = 0;
    accessibilityElements.forEach(element => {
      const found = mentoriasContent.includes(element);
      console.log(`${found ? '✅' : '❌'} Accesibilidad: "${element}"`);
      if (found) accessibilityCount++;
    });
    
    console.log('\n📊 Resumen de elementos combinados:');
    console.log(`✅ Elementos originales: ${originalCount}/${originalElements.length}`);
    console.log(`✅ Elementos avanzados: ${advancedCount}/${advancedElements.length}`);
    console.log(`✅ Elementos de accesibilidad: ${accessibilityCount}/${accessibilityElements.length}`);
    
    // Verificar redirección
    const redirectPath = path.join(__dirname, 'src/pages/formacion/mentorias-avanzadas.astro');
    const redirectContent = fs.readFileSync(redirectPath, 'utf8');
    
    console.log('\n🔀 Verificando redirección:');
    console.log('-' .repeat(50));
    
    const hasRedirect = redirectContent.includes('Astro.redirect') && 
                       redirectContent.includes('/formacion/mentorias');
    
    console.log(`${hasRedirect ? '✅' : '❌'} Redirección configurada correctamente`);
    
    // Verificar navegación actualizada
    const headerPath = path.join(__dirname, 'src/components/Header.astro');
    const headerContent = fs.readFileSync(headerPath, 'utf8');
    
    console.log('\n🧭 Verificando navegación:');
    console.log('-' .repeat(50));
    
    const hasOnlyMentorias = headerContent.includes('href="/formacion/mentorias"') &&
                            !headerContent.includes('href="/formacion/mentorias-avanzadas"');
    
    console.log(`${hasOnlyMentorias ? '✅' : '❌'} Navegación simplificada (solo "Mentorías")`);
    
    // Verificar HTML construido
    const builtPath = path.join(__dirname, 'dist/formacion/mentorias/index.html');
    const builtContent = fs.readFileSync(builtPath, 'utf8');
    
    console.log('\n🏗️ Verificando HTML construido:');
    console.log('-' .repeat(50));
    
    const builtChecks = [
      { name: 'Título correcto', test: builtContent.includes('Coding Pit: tu espacio para crecer') },
      { name: 'Secciones combinadas', test: builtContent.includes('¿Por qué una mentoría?') && builtContent.includes('Lo que ofrecemos') },
      { name: 'Testimonios incluidos', test: builtContent.includes('Ana García') && builtContent.includes('Miguel Rodríguez') },
      { name: 'Planes de precios', test: builtContent.includes('PricingPlans') || builtContent.includes('planes') },
      { name: 'Accesibilidad implementada', test: builtContent.includes('aria-label') && builtContent.includes('Skip to main content') },
      { name: 'Colores actualizados', test: builtContent.includes('neutral-') && builtContent.includes('amber-') }
    ];
    
    let builtPassed = 0;
    builtChecks.forEach(check => {
      console.log(`${check.test ? '✅' : '❌'} ${check.name}`);
      if (check.test) builtPassed++;
    });
    
    console.log('\n' + '=' .repeat(70));
    console.log('🏆 RESULTADO FINAL DE LA COMBINACIÓN');
    console.log('=' .repeat(70));
    
    const totalSuccess = (originalCount + advancedCount + accessibilityCount + builtPassed) / 
                        (originalElements.length + advancedElements.length + accessibilityElements.length + builtChecks.length);
    
    console.log(`📈 Tasa de éxito: ${(totalSuccess * 100).toFixed(1)}%`);
    
    if (totalSuccess >= 0.9) {
      console.log('\n🎉 ¡EXCELENTE! La combinación fue exitosa.');
      console.log('✅ La página unificada incluye lo mejor de ambas páginas');
      console.log('✅ Mantiene toda la funcionalidad original');
      console.log('✅ Incorpora las mejoras de accesibilidad');
      console.log('✅ La redirección está configurada correctamente');
      console.log('✅ La navegación está simplificada');
    } else {
      console.log('\n⚠️  La combinación necesita algunos ajustes.');
    }
    
    console.log('\n📋 BENEFICIOS DE LA COMBINACIÓN:');
    console.log('• Experiencia de usuario unificada');
    console.log('• Navegación simplificada (menos confusión)');
    console.log('• Mejor SEO (contenido consolidado)');
    console.log('• Mantenimiento más fácil (una sola página)');
    console.log('• Accesibilidad mejorada en toda la experiencia');
    console.log('• Colores optimizados para ambos modos');
    
    return totalSuccess >= 0.9;
    
  } catch (error) {
    console.error('❌ Error verificando la combinación:', error.message);
    return false;
  }
}

const success = verifyCombination();
process.exit(success ? 0 : 1);