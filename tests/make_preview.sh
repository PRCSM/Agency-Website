#!/usr/bin/env bash
# Builds dist/ and writes dist/nova-replica.html (artifact entry page) + prints the asset list.
set -e
cd "$(dirname "$0")/.."
npm run build >/dev/null
JS=$(cd dist/assets && ls index-*.js); CSS=$(cd dist/assets && ls index-*.css)
cat > dist/nova-replica.html <<HTML
<title>NOVA Studio Replica</title>
<meta name="description" content="Independent design studio crafting thoughtful digital products.">
<link rel="stylesheet" href="./assets/$CSS">
<div id="root"></div>
<script type="module" src="./assets/$JS"></script>
HTML
python3 -c "
import os,json
print(json.dumps(['assets/'+f for f in sorted(os.listdir('dist/assets')) if f.endswith(('.js','.css')) or ('latin-' in f and 'ext' not in f and f.endswith('.woff2'))]))"
