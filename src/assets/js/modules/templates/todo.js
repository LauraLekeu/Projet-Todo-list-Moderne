export default `
<li data-id="{{ id }}" class="{{ completedClass }}">
  <input class="toggle" type="checkbox" {{ completedCheked }} />
  <label class="editable">{{ content }}</label>

  <button class="destroy"></button>
</li>
`;
