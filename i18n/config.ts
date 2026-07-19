'use client';

// Point d'entrée unique : la détection de langue (navigateur) vit dans ./index.
// Ce fichier ne fait que réexporter pour les pages qui l'importent en side-effect.
import i18n from './index';

export default i18n;
