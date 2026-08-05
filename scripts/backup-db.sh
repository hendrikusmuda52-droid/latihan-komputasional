#!/bin/bash
# Script backup database SQLite ke file terpisah
# Jalankan secara berkala: bash scripts/backup-db.sh

DB_FILE="/home/z/my-project/db/custom.db"
BACKUP_DIR="/home/z/my-project/db/backups"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="$BACKUP_DIR/custom-backup-$TIMESTAMP.db"

mkdir -p "$BACKUP_DIR"

if [ -f "$DB_FILE" ]; then
  cp "$DB_FILE" "$BACKUP_FILE"
  echo "✅ Backup berhasil: $BACKUP_FILE"
  echo "   Ukuran: $(du -h "$BACKUP_FILE" | cut -f1)"
  
  # Hapus backup lebih dari 7 hari
  find "$BACKUP_DIR" -name "custom-backup-*.db" -mtime +7 -delete 2>/dev/null
  echo "   Backup lama (>7 hari) sudah dihapus"
else
  echo "❌ Database tidak ditemukan: $DB_FILE"
  exit 1
fi
