import { EditorShell } from '@/components/editor/editor-shell';

export default function EditorPage({
  params,
}: {
  params: { docId: string };
}) {
  return <EditorShell docId={params.docId} />;
}
