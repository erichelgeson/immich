<script lang="ts">
  import { api, type PersonResponseDto } from '@api';
  import ImageThumbnail from '../assets/thumbnail/image-thumbnail.svelte';
  import { createEventDispatcher } from 'svelte';

  export let person: PersonResponseDto;
  export let selectable = false;
  export let selected = false;
  export let thumbnailSize: number | null = null;
  export let circle = false;
  export let border = false;

  let dispatch = createEventDispatcher();

  const handleOnClicked = () => {
    dispatch('click', person);
  };
</script>

<button
  class="relative rounded-lg transition-all"
  on:click={handleOnClicked}
  disabled={!selectable}
  style:width={thumbnailSize ? thumbnailSize + 'px' : '100%'}
  style:height={thumbnailSize ? thumbnailSize + 'px' : '100%'}
>
  <div
    class="h-full w-full border-2 brightness-90 filter"
    class:rounded-full={circle}
    class:rounded-lg={!circle}
    class:border-transparent={!border}
    class:dark:border-immich-dark-primary={border}
    class:border-immich-primary={border}
  >
    <ImageThumbnail
      {circle}
      url={api.getPeopleThumbnailUrl(person.id)}
      altText={person.name}
      widthStyle="100%"
      shadow
    />
  </div>

  <div
    class="absolute left-0 top-0 h-full w-full bg-immich-primary/30 opacity-0"
    class:hover:opacity-100={selectable}
    class:rounded-full={circle}
    class:rounded-lg={!circle}
  />

  {#if selected}
    <div
      class="absolute left-0 top-0 h-full w-full bg-blue-500/80"
      class:rounded-full={circle}
      class:rounded-lg={!circle}
    />
  {/if}

  {#if person.name}
    <span
      class="w-100 text-white-shadow absolute bottom-2 left-0 w-full text-ellipsis px-1 text-center font-medium text-white hover:cursor-pointer"
    >
      {person.name}
    </span>
  {/if}
</button>
