export default `
<li data-id="{{ id }}" class="{{ completedClass }}">
  <input class="toggle" type="checkbox" {{ completedCheked }} />
  <label>{{ content }}</label>
  <button class="destroy"></button>
</li>
`;
