<script lang="ts">
    import StorygraphCSV from './Storygraph.csv?raw';
    import Papa from 'papaparse';
  let toRead: [{title:string, author:string}] = [];

  Papa.parse(StorygraphCSV, {
    worker: true,
    complete: function(results: any) {
      //console.log("Finished:", results.data);
      results.data.forEach((row: [string, string]) => {
        if (row.includes("to-read")) toRead.push({title:row[0], author: row[1]});
      });
      console.log(toRead);
    }
});
</script>

<h1>Tools</h1>
<p>Here are some tools I use to help me with my life.</p>
<p>{toRead}</p>

