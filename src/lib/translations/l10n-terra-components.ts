const de: {} = {
    terraDataTable: {
        groupFunction: 'Gruppenfunktion'
    },
    terraMultiSelectBox: {
        selectAll: 'Alle'
    },
    terraMultiCheckBox: {
        selectAll: 'Alle'
    },
    terraFileBrowser: {
        error: {
            tooLargePayload: 'Diese Datei ist zu groß.',
            tooManyFiles: 'Es können max. {{ max }} Dateien zeitgleich hochgeladen werden.'
        },
        cancel: 'Abbrechen',
        create: 'Erstellen',
        delete: 'Löschen',
        myFiles: 'Meine Dateien',
        createFolder: 'Ordner erstellen',
        confirmDelete: 'Möchtest du die Datei wirklich löschen?',
        confirmDeleteMany: 'Möchtest du die {{ count }} Dateien wirklich löschen?',
        deleteFolder: 'Ordner löschen',
        deleteFile: 'Datei löschen',
        deleteSelectedFiles: 'Ausgewählte Dateien löschen',
        folderName: 'Ordnername',
        folderIsEmpty: 'Der Ordner ist leer.',
        uploadFile: 'Datei hochladen',
        fileURL: 'Datei-URL',
        copyToClipboard: 'In Zwischenablage kopieren',
        saveMetadata: 'Metadaten speichern',
        altText: 'Alternativtext',
        imageSize: 'Größe',
        fileSize: 'Dateigröße',
        fileName: 'Dateiname',
        lastChange: 'Letzte Änderung',
        loadingFiles: 'Dateien werden geladen',
        noFiles: 'Keine Dateien',
        downloadFile: 'Datei herunterladen',
        uploadProgress:
            'Dateien werden hochgeladen: {{ filesUploaded }}/{{ filesTotal }} ({{ sizeUploaded }}/{{ sizeTotal }})',
        metadataUpdated: 'Die Metadaten wurden aktualisiert.'
    },
    terraFileInput: {
        choose: 'Wählen',
        cancel: 'Abbrechen',
        reset: 'Zurücksetzen',
        chooseFile: 'Datei wählen'
    },
    terraSuggestionBox: {
        suggestions: 'Vorschläge',
        recentlyUsed: 'Zuletzt verwendet',
        noSuggestions: 'Keine Vorschläge',
        noRecentlyUsed: 'Keine zuletzt verwendeten Elemente'
    },
    terraNavigator: {
        search: 'Suche'
    },
    terraPager: {
        page: 'Seite',
        of: 'von'
    },
    terraNoteEditor: {
        insertText: 'Text eingeben.'
    },
    terraCodeEditor: {
        changeViewOverlay: {
            title: 'Unbekannte Formatierung',
            text:
                'Durch den Wechsel in die Editor-Ansicht gehen unbekannte Formatierungen im Markup verloren. Sind Sie sicher, dass Sie die Ansicht wechseln möchten?',
            primaryButton: 'Zu Editor-Ansicht wechseln',
            secondaryButton: 'Abbrechen'
        },
        linterMessage: 'Fehler in Zeile {{ line }}, Spalte {{ col }}: {{ message }}',
        linterRules: {
            'tagname-lowercase': 'Tag-Name enthält Großbuchstaben.',
            'attr-lowercase': 'Attribut-Name enthält Großbbuchstaben.',
            'attr-value-double-quotes': 'Attribut-Wert muss in doppelten Anführungszeichen angegeben sein.',
            'attr-value-not-empty': 'Attribut muss einen Wert definieren.',
            'attr-no-duplication': 'Ein Attribut kann nicht mehrfach definiert werden.',
            'doctype-first': 'DOCTYPE muss die erste Angabe sein.',
            'tag-pair': 'Tag nicht korrekt geschlossen.',
            'tag-self-close': 'Leeres Tag muss sich selbst schließen.',
            'spec-char-escape': 'Sonderzeichen müssen escaped werden.',
            'id-unique': 'ID muss eindeutig sein.',
            'src-not-empty': 'src (img, script, link) muss definiert sein.',
            'title-require': '&lt;title> muss innerhalb von &lt;head> definiert werden.',
            'doctype-html5': 'DOCTYPE muss html5 sein.',
            'style-disabled': '&lt;style>-Tag darf nicht verwendet werden.',
            'inline-style-disabled': 'Inline-Styles dürfen nicht verwendet werden.',
            'inline-script-disabled': 'Inline-Scripts dürfen nicht verwendet werden.',
            'href-abs-or-rel': 'Link-Ziel (href) muss absolut oder relativ sein.',
            'attr-unsafe-chars': 'Attribut-Wert darf keine unsicheren Zeichen enthalten.',
            'head-script-disabled': '&lt;script>-Tag innerhalb von &lt;head> ist nicht erlaubt.'
        }
    },
    terraTextInput: {
        invalidIban: 'IBAN ist ungültig.'
    },
    terraNodeTree: {
        search: 'Suche'
    },
    timepicker: {
        minutes: 'Minuten',
        hours: 'Stunden'
    },
    terraCategoryPicker: {
        select: 'Auswählen',
        category: 'Kategorie',
        reset: 'Reset'
    },
    terraNestedDataPicker: {
        select: 'Auswählen',
        nested: 'Verschachtelt',
        reset: 'Reset'
    },
    terraDynamicForm: {
        addListEntry: 'Neuen Eintrag hinzufügen',
        removeListEntry: 'Eintrag entfernen',
        deprecated: 'Veraltete Einträge anzeigen/ausblenden'
    },
    terraStopwatch: {
        start: 'Start',
        pause: 'Pause',
        reset: 'Zurücksetzen'
    },
    tcFilter: {
        search: 'Suchen',
        reset: 'Zurücksetzen'
    },
    errorInterceptor: {
        unauthorized: 'Nicht autorisiert',
        missingPermissions: 'Fehlende Berechtigungen für:',
        forbidden: 'Keine Berechtigung'
    },
    terraMatPaginatorIntl: {
        itemsPerPage: 'Ergebnisse pro Seite',
        ofLabel: 'von'
    },
    tableSettings: {
        confirm: 'Bestätigen',
        cancel: 'Abbrechen',
        configColumns: 'Spalten konfigurieren'
    },
    validators: {
        required: 'Dies ist ein Pflichtfeld.',
        min: 'Der Mindestwert ist überschritten.',
        max: 'Der Maximalwert ist überschritten.'
    }
};

const en: {} = {
    terraDataTable: {
        groupFunction: 'Group function'
    },
    terraMultiSelectBox: {
        selectAll: 'All'
    },
    terraMultiCheckBox: {
        selectAll: 'All'
    },
    terraFileBrowser: {
        error: {
            tooLargePayload: 'This file is too large to upload.',
            tooManyFiles: 'Max. {{ max }} files can be uploaded at once.'
        },
        cancel: 'Cancel',
        create: 'Create',
        delete: 'Delete',
        myFiles: 'My files',
        createFolder: 'Create folder',
        confirmDelete: 'Do you really want to delete this file?',
        confirmDeleteMany: 'Do you really want to delete the {{ count }} files?',
        deleteFolder: 'Delete folder',
        deleteFile: 'Delete file',
        deleteSelectedFiles: 'Delete selected files',
        folderName: 'Folder name',
        folderIsEmpty: 'Folder is empty.',
        uploadFile: 'Upload file',
        fileURL: 'File URL',
        copyToClipboard: 'Copy to clipboard',
        saveMetadata: 'Save metadata',
        altText: 'Alternative text',
        imageSize: 'Size',
        fileSize: 'File size',
        fileName: 'File name',
        lastChange: 'Last change',
        loadingFiles: 'Loading files',
        noFiles: 'No files',
        downloadFile: 'Download file',
        uploadProgress: 'Uploading files: {{ filesUploaded }}/{{ filesTotal }} ({{ sizeUploaded }}/{{ sizeTotal }})',
        metadataUpdated: 'The metadata have been updated.'
    },
    terraFileInput: {
        choose: 'Select',
        cancel: 'Cancel',
        reset: 'Reset',
        chooseFile: 'Select file'
    },
    terraSuggestionBox: {
        suggestions: 'Suggestions',
        recentlyUsed: 'Recently used',
        noSuggestions: 'No suggestions',
        noRecentlyUsed: 'No recently used elements'
    },
    terraNavigator: {
        search: 'Search'
    },
    terraPager: {
        page: 'Page',
        of: 'of'
    },
    terraNoteEditor: {
        insertText: 'Insert text.'
    },
    terraCodeEditor: {
        changeViewOverlay: {
            title: 'Unknown code formatting',
            text:
                'Switching to the editor view will cause unknown markup formatting to be lost. Are you sure you want to change the view?',
            primaryButton: 'Switch to editor view',
            secondaryButton: 'Cancel'
        },
        linterMessage: 'Error in line {{ line }}, column {{ col }}: {{ message }}',
        linterRules: {
            'tagname-lowercase': 'Tag name must be lowercase.',
            'attr-lowercase': 'Attribute name must be lowercase.',
            'attr-value-double-quotes': 'Attribute value must be closed by double quotes.',
            'attr-value-not-empty': 'Attribute must set a value.',
            'attr-no-duplication': 'The same attribute cannot be specified twice.',
            'doctype-first': 'DOCTYPE must be specified first.',
            'tag-pair': 'Tag is not closed correctly.',
            'tag-self-close': 'Empty tag must close itself.',
            'spec-char-escape': 'Special characters must be escaped.',
            'id-unique': 'ID attributes must be unique in the document.',
            'src-not-empty': 'src of img (script,link) must set a value.',
            'title-require': '&lt;title> must be present in &lt;head> tag.',
            'doctype-html5': 'DOCTYPE must be html5.',
            'style-disabled': '&lt;style>-tag must not be used.',
            'inline-style-disabled': 'Inline styles must not be used.',
            'inline-script-disabled': 'Inline scripts must not be used.',
            'href-abs-or-rel': 'Link target (href) must be absolute or relative.',
            'attr-unsafe-chars': 'Attribute value must not contain any unsafe chars.',
            'head-script-disabled': 'The script tag must not be used in &lt;head>.'
        }
    },
    terraTextInput: {
        invalidIban: 'IBAN is not valid.'
    },
    terraNodeTree: {
        search: 'Search'
    },
    timepicker: {
        minutes: 'Minutes',
        hours: 'Hours'
    },
    terraCategoryPicker: {
        select: 'Select',
        category: 'Category',
        reset: 'Reset'
    },
    terraNestedDataPicker: {
        select: 'Select',
        nested: 'Nested',
        reset: 'Reset'
    },
    terraDynamicForm: {
        addListEntry: 'Add new entry',
        removeListEntry: 'Remove entry',
        deprecated: 'Toggle deprecated entries'
    },
    terraStopwatch: {
        start: 'Start',
        pause: 'Pause',
        reset: 'Reset'
    },
    tcFilter: {
        search: 'Search',
        reset: 'Reset'
    },
    errorInterceptor: {
        unauthorized: 'Unauthorised',
        missingPermission: 'Missing permissions for:',
        forbidden: 'Forbidden'
    },
    terraMatPaginatorIntl: {
        itemsPerPage: 'Results per page',
        ofLabel: 'of'
    },
    tableSettings: {
        confirm: 'Confirm',
        cancel: 'Cancel',
        configColumns: 'Configure columns'
    },
    validators: {
        required: 'This is a mandatory field.',
        min: 'The minimum value has been exceeded.',
        max: 'The maximum value has been exceeded.'
    }
};

export const l10nTerraComponents: {} = {
    de: de,
    en: en
};
